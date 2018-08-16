package com.example.naistest.controllers;

import com.example.naistest.domain.Person;
import com.example.naistest.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity getPersonById(@PathVariable("id") String id){
        Optional<Person> person = personRepository.findById(id);
        return person.<ResponseEntity<?>>map(person1 -> new ResponseEntity<>(person1, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping("/add")
    public ResponseEntity addPerson(@RequestBody(required = true) Person person){
        if (person.getId() != null && !person.getId().isEmpty()){
            return new ResponseEntity<>(personRepository.save(person), HttpStatus.OK);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/list")
    public ResponseEntity list(){
        return new ResponseEntity<>(personRepository.findAll(), HttpStatus.OK);
    }

}
