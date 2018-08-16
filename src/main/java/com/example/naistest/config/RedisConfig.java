package com.example.naistest.config;

import com.example.naistest.redis.MessagePublisher;
import com.example.naistest.redis.MessageSubscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisNode;
import org.springframework.data.redis.connection.RedisSentinelConfiguration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericToStringSerializer;


@Configuration
@PropertySource("classpath:application.yml")
public class RedisConfig {

    @Autowired
    Environment environment;

    @Value("${spring.redis.host}")
    private String redisHostName;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Value("${spring.redis.sentinel.master}")
    private String redisSentinelMaster;

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }


    @Bean
    JedisConnectionFactory jedisConnectionFactory() {

        JedisConnectionFactory factory;

        boolean isLocalDev = true;/*Arrays.stream(environment.getActiveProfiles()).anyMatch(
                env -> (env.equalsIgnoreCase("test")
                        || env.equalsIgnoreCase("local")) );
*/
        if (isLocalDev) {

            RedisStandaloneConfiguration standaloneConfiguration =
                    new RedisStandaloneConfiguration(redisHostName, redisPort);
            factory = new JedisConnectionFactory(
                    standaloneConfiguration
            );
        } else {

            RedisSentinelConfiguration sentinelConfiguration = new RedisSentinelConfiguration()
                    .sentinel(new RedisNode(redisHostName, redisPort));
            if (!redisSentinelMaster.isEmpty()) {
                sentinelConfiguration.setMaster(redisSentinelMaster);
            }

            factory = new JedisConnectionFactory(
                    sentinelConfiguration //standaloneConfiguration
            );
        }

        return factory;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        final RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
        return template;
    }

    @Bean
    MessageListenerAdapter messageListener() {
        return new MessageListenerAdapter(new MessageSubscriber());
    }

    @Bean
    RedisMessageListenerContainer redisContainer() {
        final RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(messageListener(), topic());
        return container;
    }

    @Bean
    MessagePublisher redisPublisher() {
        return new MessagePublisher(redisTemplate(), topic());
    }

    @Bean
    ChannelTopic topic() {
        return new ChannelTopic("pubsub:queue");
    }

}
