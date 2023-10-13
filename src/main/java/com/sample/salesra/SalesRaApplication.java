package com.sample.salesra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SalesRaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesRaApplication.class, args);
    }
}
