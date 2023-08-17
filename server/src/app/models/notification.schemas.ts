import connectionMySQL from "../../libs/database/db";

// connectionMySQL.connect((error) => {
//   if (error) {
//     console.error('Không thể kết nối tới cơ sở dữ liệu:', error);
//   } else {
//     console.log('Đã kết nối tới cơ sở dữ liệu');
//   }
// });

// Định nghĩa schema
const createNotificationsTableQuery = `
  CREATE TABLE IF NOT EXISTS Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    type ENUM('like', 'comment') NOT NULL,
    tweetId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

connectionMySQL.query(createNotificationsTableQuery, (error) => {
  if (error) {
    console.error("Không thể tạo bảng Notifications:", error);
  } else {
    console.log("Bảng Notifications đã được tạo hoặc đã tồn tại");
  }
});

// Đóng kết nối sau khi các thao tác hoàn thành
connectionMySQL.end();
