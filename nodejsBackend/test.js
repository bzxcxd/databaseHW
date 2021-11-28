// 引入express库
let express = require('express');
app = express();

// 读取前端post请求时发送来的json对象
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// 创建服务器，端口号为8080
let server = app.listen(8080, function () {
    console.log("服务器已启动");
})

// 配置数据库
let mysql = require("mysql");
let sqlServer = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "schooldb"
});

// 连接数据库
sqlServer.connect(function (err) {
    if (err) {
        console.log(`数据库连接失败: ${err}!`);
    } else {
        console.log("数据库连接成功!");
    }
});

// 关闭数据库连接
function closeMysql(connect) {
    connect.end((err) => {
        if (err) {
            console.log(`mysql关闭失败:${err}!`);
        } else {
            console.log('mysql关闭成功!');
        }
    });
}

// 在响应头里解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    });

app.get('/student/:id', function (req, res) {
    const id = req.params.id;

    /*
    ** sql查询语句
        select name, student.dept_name, takes.course_id, title, credits, grade 
        from student 
        join takes on student.id=takes.id and student.id='12345' 
        join course on course.course_id=takes.course_id
    */

    let sqlQuery = "select name, student.dept_name, takes.course_id, title, credits, grade from student join takes on student.id=takes.id and student.id=" + id + " join course on course.course_id=takes.course_id";
    sqlServer.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            res.send(result);
            //closeMysql(sqlServer);
        }
    });
})

app.post('/course', function (req, res) {
    let word = req.body['word'];
    
    /*
    ** sql查询语句
        select * 
        from course 
        where title like '%Bi%'
    */

    let sqlQuery = "select * from course where title like '%" + word + "%'";
    sqlServer.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            res.send(result);
            //closeMysql(sqlServer);
        }
    });
})

app.get('/unpass', function (req, res) {
    /*
    ** sql查询语句
        select name
        from student 
        join takes on student.id=takes.id
        join course on course.course_id=takes.course_id
        where grade='F'
        group by name 
        having count(grade)>2
    */

    let sqlQuery = "select name from student join takes on student.id=takes.id join course on course.course_id=takes.course_id where grade='F' group by name  having count(grade)>2";
    sqlServer.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            res.send(result);
            //closeMysql(sqlServer);
        }
    });
})

app.post('/student', function (req, res) {
    const student = req.body;

    /*
    ** sql插入语句
        insert into student (ID, name, dept_name, tot_cred) values('111', 'lbw', 'Comp. Sci.', 0)
    */

    let sqlQuery = "insert into student (ID, name, dept_name, tot_cred) values('" + student.ID + "', '" + student.name +"', '" + student.dept_name + "', " + student.tot_creds +")";
    
    sqlServer.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            res.send(result);
            //closeMysql(sqlServer);
        }
    });
})

app.post('/instructor', function (req, res) {
    const instructor = req.body;

    /*
    ** sql插入语句
        insert into instructor (ID, name, dept_name, salary) values('111', 'lbw', 'Comp. Sci.', 10000)
    */

    let sqlQuery = "insert into instructor (ID, name, dept_name, salary) values('" + instructor.ID + "', '" + instructor.name +"', '" + instructor.dept_name + "', " + instructor.salary +")";
    
    sqlServer.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            res.send(result);
            //closeMysql(sqlServer);
        }
    });
})