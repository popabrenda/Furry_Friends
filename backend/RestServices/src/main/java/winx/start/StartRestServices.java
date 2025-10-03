package winx.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.util.Properties;

@ComponentScan({"Domain","Repository","winx.controller","Utils"})
@SpringBootApplication
public class StartRestServices {

    public static void main(String[] args) {

        SpringApplication.run(StartRestServices.class, args);
    }

    @Bean(name="props")
    public Properties getBdProperties(){
        Properties props = new Properties();
        try {
            props.load(StartRestServices.class.getResourceAsStream("/bd.config"));
        } catch (IOException e) {
            System.err.println("Configuration file bd.cong not found" + e);

        }
        return props;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite toate căile
                        .allowedOrigins("http://localhost:5173") // Permite acces doar din această origine
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Permite metodele dorite
                        .allowedHeaders("*"); // Permite toate headerele
            }
        };
    }

}
