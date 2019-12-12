while read line; do curl -v -i -X POST -H "Content-Type:application/json" --data "$line" http://127.0.0.1:8080/api/article; done < $1
