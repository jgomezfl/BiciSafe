package com.bicisafe.demo.service;

import com.bicisafe.demo.model.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);

}
