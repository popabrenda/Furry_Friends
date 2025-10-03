package Utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

@Component
public class JdbcUtils
{
    private Properties jdbcProps;

    @Autowired
    public JdbcUtils(Properties props){
        jdbcProps=props;
    }

    private Connection instance = null;

    private Connection getNewConnection() {
        String url = jdbcProps.getProperty("jdbc.url");
        String user = jdbcProps.getProperty("jdbc.user");
        String pass = jdbcProps.getProperty("jdbc.pass");

        Connection con = null;
        try {
            if (user != null && pass != null) {
                con = DriverManager.getConnection(url, user, pass);
            } else {
                con = DriverManager.getConnection(url);
            }
        } catch (SQLException e) {
            System.out.println("Error getting connection: " + e.getMessage());
        }
        return con;
    }

    public Connection getConnection() {
        try {
            if (instance == null || instance.isClosed()) {
                instance = getNewConnection();
            }
        } catch (SQLException e) {
            System.out.println("Error DB: " + e.getMessage());
        }
        return instance;
    }
}
