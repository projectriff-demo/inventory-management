package io.projectriff.samples.shopping.inventoryapi.exceptions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ControllerAdvice
public class HackyInvalidEntityExceptionHandler extends ResponseEntityExceptionHandler {

  private final ObjectMapper objectMapper;

  @Autowired
  public HackyInvalidEntityExceptionHandler(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException exception, HttpHeaders headers, HttpStatus status, WebRequest request) {
    Throwable cause = exception.getCause();
    if (!(cause instanceof ValueInstantiationException)) {
      return super.handleHttpMessageNotReadable(exception, headers, status, request);
    }
    Throwable validationException = cause.getCause();
    if (!(validationException instanceof InvalidEntityException)) {
      return super.handleHttpMessageNotReadable(exception, headers, status, request);
    }

    String responseBody = serializeValidationError(validationException);
    headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
    return handleExceptionInternal(exception, responseBody, headers, BAD_REQUEST, request);
  }

  private String serializeValidationError(Throwable validationException) {
    try {
      return objectMapper.writeValueAsString(validationException);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
