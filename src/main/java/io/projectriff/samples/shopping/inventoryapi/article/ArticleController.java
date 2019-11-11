package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestController
public class ArticleController {

  private final ArticleRepository articleRepository;

  @Autowired
  public ArticleController(ArticleRepository articleRepository) {
    this.articleRepository = articleRepository;
  }

  @DeleteMapping(value = "/article")
  public ResponseEntity<Article> deleteBySku(@RequestParam("sku") String sku) {
    this.articleRepository.deleteBySku(sku);
    return ResponseEntity.noContent().build();
  }
}
