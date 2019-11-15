package io.projectriff.samples.shopping.inventoryapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import io.projectriff.samples.shopping.inventoryapi.article.ArticleRepository;
import io.projectriff.samples.shopping.inventoryapi.exceptions.InvalidEntityException;
import io.projectriff.samples.shopping.inventoryapi.exceptions.InvalidEntityExceptionSerializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@SpringBootApplication
@EnableJdbcRepositories(basePackageClasses = ArticleRepository.class)
public class InventoryApiApplication {

  @Bean
  public ObjectMapper objectMapper() {
    var module = new SimpleModule();
    module.addSerializer(new InvalidEntityExceptionSerializer(InvalidEntityException.class));
    var mapper = new ObjectMapper();
    mapper.registerModule(module);
    return mapper;
  }

  public static void main(String[] args) {
    SpringApplication.run(InventoryApiApplication.class, args);
  }

}
