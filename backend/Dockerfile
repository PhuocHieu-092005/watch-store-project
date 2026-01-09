# --- Giai đoạn 1: Build file .jar ---
# Dùng Maven và Java 17 để build code
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Lệnh này sẽ đóng gói code, bỏ qua việc chạy test để tiết kiệm thời gian
RUN mvn clean package -DskipTests

# --- Giai đoạn 2: Chạy ứng dụng ---
# Dùng bản Java nhẹ (Slim) để chạy cho nhanh
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
# Copy file .jar đã build ở trên vào đây
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080 (Cổng mặc định của Spring Boot)
EXPOSE 8080

# Lệnh chạy ứng dụng
ENTRYPOINT ["java","-jar","app.jar"]