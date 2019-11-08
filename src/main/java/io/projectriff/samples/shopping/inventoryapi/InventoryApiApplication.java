package io.projectriff.samples.shopping.inventoryapi;

import io.projectriff.samples.shopping.inventoryapi.article.ArticleRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@SpringBootApplication
@EnableJdbcRepositories(basePackageClasses = ArticleRepository.class)
public class InventoryApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(InventoryApiApplication.class, args);
  }

}
