package io.projectriff.samples.shopping.inventoryapi.exceptions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

class InvalidEntityExceptionSerializerTest {

  private ObjectMapper mapper;

  @BeforeEach
  void prepare() {
    var serializer = new InvalidEntityExceptionSerializer(InvalidEntityException.class);
    SimpleModule module = new SimpleModule();
    module.addSerializer(serializer);
    mapper = new ObjectMapper();
    mapper.registerModule(module);
  }

  @Test
  @DisplayName("serializes entity validation exception")
  void serializes_entity_validation_exception() throws JsonProcessingException {
    InvalidEntityException invalidEntityException = new InvalidEntityException(Arrays.asList(
      new PropertyValidationError("foo", "expected bar"),
      new PropertyValidationError("bar", "expected foo")));

    String result = mapper.writeValueAsString(invalidEntityException);

    assertThat(result)
      .isEqualTo("[{\"property\":\"foo\",\"reason\":\"expected bar\"},{\"property\":\"bar\",\"reason\":\"expected foo\"}]");
  }
}
