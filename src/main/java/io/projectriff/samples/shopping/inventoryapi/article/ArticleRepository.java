package io.projectriff.samples.shopping.inventoryapi.article;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource(path = "article")
public interface ArticleRepository extends CrudRepository<Article, Long> {
}
