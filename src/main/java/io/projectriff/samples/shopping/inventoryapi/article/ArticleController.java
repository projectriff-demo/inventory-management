package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestController
public class ArticleController {

  private final ArticleRepository articleRepository;

  @Autowired
  public ArticleController(ArticleRepository articleRepository) {
    this.articleRepository = articleRepository;
  }

  @PatchMapping(value = "/article/updateQuantityBySku")
  public ResponseEntity<Article> updateQuantityBySku(@RequestParam("sku") String sku, @RequestBody ArticleQuantityUpdate data) {
    Article found = this.articleRepository.findBySku(sku);
    if (found == null) {
      return ResponseEntity.notFound().build();
    }
    int count = this.articleRepository.updateQuantityBySku(sku, data.getCurrentQuantity(), data.getNewQuantity());
    if (count == 0) {
      return ResponseEntity.badRequest().build();
    } else {
      Article updated = new Article(found.getId(), found.getSku(), found.getName(), found.getDescription(),
        found.getPriceInUsd(), found.getImageUrl(), data.getNewQuantity());
      return ResponseEntity.ok(updated);
    }
  }

  @DeleteMapping(value = "/article/deleteBySku")
  public ResponseEntity<Article> deleteBySku(@RequestParam("sku") String sku) {
    this.articleRepository.deleteBySku(sku);
    return ResponseEntity.noContent().build();
  }
}
