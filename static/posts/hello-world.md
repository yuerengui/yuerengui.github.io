>111

![Alt text](/images/test.jpeg)



```php
$pdo = \Weshare\Models\ModelBase::getPdoConnection();

$sql = "INSERT INTO listing set flg_sold = :flg_sold";

$statement = $pdo_ro->prepare($sql);

$flg_sold = 1;

$statement->bindValue(':flg_sold', $flg_sold, \PDO::PARAM_INT);

if($statement->execute() == false){
    return false;
}

if($statement->rowCount() == 0){
    return false;
}

$insertId = $pdo->lastInsertId();

return $insertId;

```