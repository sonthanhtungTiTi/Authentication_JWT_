- flow
Các bước làm: cài môi trường: 
npm i express cors dotenv mongoose
cài đặc BE:
 <img width="720" height="506" alt="image" src="https://github.com/user-attachments/assets/b5e71d07-5f80-4983-a5aa-6cf0567bbf76" />

Set data trong env: 
 <img width="719" height="156" alt="image" src="https://github.com/user-attachments/assets/c83d82d5-2a74-4cb6-9e37-d47f165e7b60" />

2/ connect DB
 <img width="719" height="156" alt="image" src="https://github.com/user-attachments/assets/f8da5d61-6598-41aa-9fc8-574e6ae5c36f" />

Goi hamf trong server.js
 <img width="940" height="283" alt="image" src="https://github.com/user-attachments/assets/507b1389-b94c-4e0a-929f-2b8c84bd639f" />

//tao model Schema cho data user:
 <img width="940" height="693" alt="image" src="https://github.com/user-attachments/assets/57a7a3b0-edde-4fa3-954d-ad86800b0fb0" />
<img width="940" height="775" alt="image" src="https://github.com/user-attachments/assets/0946ad1d-1026-46f0-81b4-6c455da1af03" />

 
//cai dac IPA trong router	 
 <img width="856" height="825" alt="image" src="https://github.com/user-attachments/assets/d1a69686-f115-489c-81f3-4f9c77065188" />


Cai them libs before set SignUp funtion;
 
<img width="940" height="338" alt="image" src="https://github.com/user-attachments/assets/059348fa-d731-4513-ab38-5668db68bb64" />


Import in server.js  
<img width="822" height="588" alt="image" src="https://github.com/user-attachments/assets/842a8e47-9d80-4acd-a05c-8285cc23ff8a" />

Tạo hào signUp dùng trong router / authRouter;  import vào day de nhan thong tin lên tu form
Ktra input -> ktra trung hay có username chua -> tao user -> return respone
 <img width="854" height="384" alt="image" src="https://github.com/user-attachments/assets/375549e8-2418-42c3-b420-3b3d227fe985" />

//tạo logic xu li để xử lí data of form signUp:
 <img width="940" height="788" alt="image" src="https://github.com/user-attachments/assets/e4f9332c-12f5-4625-8ba4-f0e56cc83613" />


//test voi postman api signup
  <img width="940" height="538" alt="image" src="https://github.com/user-attachments/assets/d12aab2b-b99d-4354-ab65-f989f636340e" />

Tao ruoter signIn , import vao router từ hàm trong controller trong authRouter tạo mà bất đồng bộ singIn;
Flow signIn:  
<img width="940" height="589" alt="image" src="https://github.com/user-attachments/assets/a56c88b8-9ba4-4dca-b13c-db3b723ba6a3" />

Ktra user name xong den password 
Taoj access token secret_token
 <img width="940" height="621" alt="image" src="https://github.com/user-attachments/assets/7cdeab85-7807-4f91-9da1-2700be96376e" />

//tao accesstoken
<img width="940" height="621" alt="image" src="https://github.com/user-attachments/assets/479c233e-8ff6-4f50-99f6-a6af2d746422" />
<img width="940" height="621" alt="image" src="https://github.com/user-attachments/assets/4f7cfecc-466b-4166-b81c-db70437afc97" />

 
Logic dang nhap
 
//goi ra dung trong server  
So luot key  




