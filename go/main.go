package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
)

var db = Db()

type User struct {
	ID               int
	Name             string
	Email            string
	Password         string
	Confirm_password string
}

type Data struct {
	ID          int
	Temperature float32
	Humidity    float32
	MesuredAt   string
	Sensor_id   int
}

type SendData struct {
	Temperature int
	Humidity    int
}

type Sensor struct {
	ID          string
	Sensor_name string
}

type SensorEmplacement struct {
	ID   string
	Name string
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getDateFormated() (d string) {
	date := time.Now()
	hour := ""
	min := ""
	day := "date.Day()"
	if date.Hour() < 10 {
		hour = "0" + strconv.Itoa(date.Hour())
	} else {
		hour = strconv.Itoa(date.Hour())
	}
	if date.Minute() < 10 {
		min = "0" + strconv.Itoa(date.Minute())
	} else {
		min = strconv.Itoa(date.Minute())
	}
	if date.Day() < 10 {
		day = "0" + strconv.Itoa(date.Day())
	} else {
		day = strconv.Itoa(date.Day())
	}
	d = day + "|" + hour + "h" + min
	return d
}

func main() {
	s := gin.Default()
	s.Use(CORSMiddleware())

	defer db.Close()

	s.GET("/lastreport/:id", func(c *gin.Context) {
		var data Data
		id := c.Param("id")
		err := db.Get(&data, "select * from public.data where sensor_id = $1 order by id desc limit 1", id)
		if err != nil {
			if err.Error() == "sql: no rows in result set" {
				c.JSON(204, gin.H{"message": "No data found"})
				return
			}
			fmt.Println(err)
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, &data)
	}) // Good ✅
	s.GET("/dayreport/:id", func(c *gin.Context) {
		var data []Data
		id := c.Param("id")
		rows, err := db.Query("select * from public.data where sensor_id = $1 order by id desc limit 288", id)
		for rows.Next() {
			var d Data
			err = rows.Scan(&d.ID, &d.Temperature, &d.Humidity, &d.MesuredAt, &d.Sensor_id)
			if err != nil {
				fmt.Println("Error Scanning user", err)
				return
			}
			data = append(data, d)
		}
		if err != nil {
			fmt.Println(err)
			return
		}
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		fmt.Println(&data)
		c.JSON(200, &data)
	}) // Good ✅
	s.GET("/sensor", func(c *gin.Context) {
		var sensors []Sensor
		rows, err := db.Query("select * from public.sensor")
		for rows.Next() {
			var sensor Sensor
			err = rows.Scan(&sensor.ID, &sensor.Sensor_name)
			if err != nil {
				fmt.Println("Error Scanning user", err)
				return
			}
			sensors = append(sensors, sensor)
		}
		if err != nil {
			fmt.Println(err)
			return
		}
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		if len(sensors) > 0 {
			c.JSON(200, sensors)
		} else {
			c.JSON(200, gin.H{"message": "No sensors found"})
		}
	}) // Good ✅
	s.POST("/data/:id", func(c *gin.Context) {
		var data SendData
		var measured string
		measured = getDateFormated()
		id := c.Param("id")
		err := c.BindJSON(&data)
		if err != nil {
			fmt.Println("Error binding json", err)
			fmt.Println(err)
			return
		}
		db.MustExec("insert into public.data (temperature , humidity, sensor_id, mesuredat) values ($1, $2, $3, $4)", data.Temperature, data.Humidity, id, measured)
		c.JSON(200, gin.H{"message": "success"})
	}) // good ✅
	s.POST("/createSensor", func(c *gin.Context) {
		var sensors []Sensor
		rows, err := db.Query("select * from public.sensor")
		for rows.Next() {
			var sensor Sensor
			err = rows.Scan(&sensor.ID, &sensor.Sensor_name)
			if err != nil {
				fmt.Println("Error Scanning user", err)
				return
			}
			sensors = append(sensors, sensor)
		}
		if err != nil {
			fmt.Println("Error getting user SQL", err)
			return
		}
		if len(sensors) > 0 {
			for _, sensor := range sensors {
				if sensor.ID == c.PostForm("id") {
					c.JSON(500, gin.H{"error": "Sensor already exists"})
					return
				} else {
					var sensor Sensor
					err := c.BindJSON(&sensor)
					if err != nil {
						fmt.Println(err)
						return
					}
					db.MustExec("insert into public.sensor (id, sensor_name) values ($1, $2)", sensor.ID, sensor.Sensor_name)
					c.JSON(200, gin.H{"message": "success"})
				}
			}
		} else {
			var sensor Sensor
			err := c.BindJSON(&sensor)
			if err != nil {
				fmt.Println(err)
				return
			}
			db.MustExec("insert into public.sensor (id, sensor_name) values ($1, $2)", sensor.ID, sensor.Sensor_name)
			fmt.Println("createSensor 11.2")
			c.JSON(200, gin.H{"message": "success"})
		}

	}) // Good ✅
	s.POST("/login", func(c *gin.Context) {
		var user User
		err := c.BindJSON(&user)
		if err != nil {
			fmt.Println("Error getting user from JSON", err)
			return
		}
		var users []User
		rows, err := db.Query("select * from public.users where name = $1", user.Name)
		if err != nil {
			fmt.Println("Error getting user SQL", err)
			return
		}
		for rows.Next() {
			var user User
			err = rows.Scan(&user.ID, &user.Name, &user.Email, &user.Password)
			if err != nil {
				fmt.Println("Error Scanning user", err)
				return
			}
			users = append(users, user)
		}

		if len(users) > 0 {
			for _, u := range users {
				err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(user.Password))
				if err != nil && u.Name == user.Name {
					c.JSON(200, gin.H{"message": "success"})
					return
				} else {
					c.JSON(500, gin.H{"error": "Invalid login"})
				}
			}
		} else {
			c.JSON(500, gin.H{"error": "Any User register"})
		}
	}) // Good ✅
	s.POST("/signup", func(c *gin.Context) {
		var users []User
		err := db.Select(&users, "select * from users order by id desc")
		if err != nil {
			fmt.Println("Error getting users")
			return
		}
		var user User
		err = c.BindJSON(&user)
		if err != nil {
			fmt.Println("Error binding user")
			return
		}
		if user.Email == "" || user.Name == "" || user.Password == "" {
			c.JSON(500, gin.H{"message": "Please fill all fields"})
			return
		}
		if user.Password != user.Confirm_password {
			c.JSON(500, gin.H{"message": "Passwords do not match"})
			return
		}
		if len(users) > 0 {
			for _, u := range users {
				if u.Email == user.Email && u.Name == user.Name {
					c.JSON(500, gin.H{"message": "Name or Email already exists"})
					return
				} else {
					hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
					if err != nil {
						fmt.Println(err)
						return
					}
					dbErr := db.MustExec(`insert into users (name, email, password) values ($1, $2, $3)`, user.Name, user.Email, hash)
					if dbErr != nil {
						fmt.Println(dbErr)
						return
					}
					c.JSON(200, gin.H{"message": "success"})
				}
			}
		} else {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			if err != nil {
				fmt.Println(err)
				return
			}
			userInsert := `insert into users (name, email, password) values ($1, $2, $3)`
			db.MustExec(userInsert, user.Name, user.Email, hash)
			c.JSON(200, gin.H{"message": "success"})
		}
	}) // Good ✅
	s.PUT("/updateSensor/:id", func(c *gin.Context) {
		var sensor Sensor
		var name SensorEmplacement
		err := c.BindJSON(&name)
		if err != nil {
			fmt.Println(err)
			c.JSON(400, gin.H{"error": "Invalid data provided"})
			return
		}
		id := c.Param("id")
		Gerr := db.Get(&sensor, "select * from public.sensor where id = $1", id)
		if Gerr != nil {
			if Gerr.Error() == "sql: no rows in result set" {
				c.JSON(204, gin.H{"message": "No sensor found"})
				return
			}
			c.JSON(500, gin.H{"error": "Error getting sensor"})
			return
		}
		db.MustExec("update public.sensor set sensor_name = $1 where id = $2", &name.Name, id)
		c.JSON(200, gin.H{"message": "success"})
	}) // Good ✅
	s.DELETE("/deleteSensor/:id", func(c *gin.Context) {
		var sensor Sensor
		id := c.Param("id")
		err := db.Get(&sensor, "select * from public.sensor where id = $1", id)
		if err != nil {
			if err.Error() == "sql: no rows in result set" {
				c.JSON(204, gin.H{"message": "No sensor found"})
				return
			}
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		db.MustExec("delete from public.sensor where id = $1", id)
		c.JSON(200, gin.H{"message": "success"})
	}) // Good ✅
	err := s.Run("127.0.0.1:5000")
	if err != nil {
		fmt.Println(err)
		return
	}
}
