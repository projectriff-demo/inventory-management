kubectl port-forward svc/inventory-api 8080:80 &
sleep 5
while read line; do curl -i -X POST -H "Content-Type:application/json" --data "$line" http://127.0.0.1:8080/api/article; done < $1
kill $(jobs -p)
exit
