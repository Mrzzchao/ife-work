
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Linux实验</title>
    <style media="screen">
        /*reset -start*/
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: "microsoft yahei";
            background: #dedede;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }

        /*reset -end*/

        /*main -start*/
        .main {
            position: relative;
            margin: 20px;
            padding: 20px;
            border-bottom: 2px solid #848484;
            background: #fff;
            min-height: 500px;
        }
        .main h3 {
            margin: 10px 0;
            color: rgb(137, 136, 145);
        }
        .main .author {
            position: absolute;
            bottom:20px;
            right: 20px;
            margin: 10px 0;
            color: #000;
            font-size: 10px;
            text-align: right;
        }

        .main .tab {
            width: 100%;
            text-align: left;
            border: 1px solid #ccc;
        }
        .tab td, .tab th {
            height: 30px;
            line-height: 30px;
        }
        .tab th {
            color: #fff;
            background: #333;
        }
        /*main -end*/

        /*footer -start*/
        footer {
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            background: #000;
        }

    </style>
</head>
<body>
    <div class="main">
        <h2 style="text-align: center;">Linux综合实验</h2>
        <h3>下面是数据库导出一个表格</h3>
        <table border="1" class="tab">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $con = mysql_connect("localhost","root","zzc182764");
                    if (!$con)
                      {
                      die('Could not connect: ' . mysql_error());
                      }

                    mysql_select_db("MYDB", $con);

                    $result = mysql_query("SELECT * FROM Person");


                    while($row = mysql_fetch_array($result))
                      {
                      echo "<tr>";
                      echo "<td>" . $row['id'] . "</td>";
                      echo "<td>" . $row['name'] . "</td>";
                      echo "<td>" . $row['sex'] . "</td>";
                      echo "<td>" . $row['age'] . "</td>";
                      echo "</tr>";
                      }

                    mysql_close($con);
                ?>
            </tbody>
        </table>
        <div class="author">张智超&nbsp;文章发表时间 2016/5/18</div>
    </div>
    <footer>
        <p>版权所有&copy;</p>
    </footer>
</body>
</html>
