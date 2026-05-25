package com.edenred.ecoflux;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Ecoflux Spring Boot application.
 */
@SpringBootApplication
public class EcofluxApplication {

	/**
	 * Boots the Spring application.
	 *
	 * @param args command-line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(EcofluxApplication.class, args);
	}

}
