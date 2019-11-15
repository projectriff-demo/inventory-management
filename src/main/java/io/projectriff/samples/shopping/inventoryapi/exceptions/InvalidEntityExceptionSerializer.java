package io.projectriff.samples.shopping.inventoryapi.exceptions;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.List;

public class InvalidEntityExceptionSerializer extends StdSerializer<InvalidEntityException> {

  public InvalidEntityExceptionSerializer(Class<InvalidEntityException> type) {
    super(type);
  }

  @Override
  public void serialize(InvalidEntityException exception,
                        JsonGenerator jsonGenerator,
                        SerializerProvider serializerProvider) throws IOException {

    List<PropertyValidationError> propertyErrors = exception.getPropertyErrors();
    jsonGenerator.writeStartArray(propertyErrors.size());
    for (PropertyValidationError error : propertyErrors) {
      jsonGenerator.writeStartObject();
      jsonGenerator.writeStringField("property", error.getProperty());
      jsonGenerator.writeStringField("reason", error.getReason());
      jsonGenerator.writeEndObject();
    }
    jsonGenerator.writeEndArray();

  }
}
