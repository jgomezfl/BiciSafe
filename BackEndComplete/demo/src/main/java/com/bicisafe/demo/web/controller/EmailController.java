package com.bicisafe.demo.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bicisafe.demo.model.EmailDetails;
import com.bicisafe.demo.service.EmailService;

@RestController
@CrossOrigin(origins = "*")
public class EmailController {
    
    @Autowired private EmailService emailService;

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details){
        String status = emailService.sendSimpleMail(details);
        return status;
    }

}
