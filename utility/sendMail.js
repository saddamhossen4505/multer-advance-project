const nodemailer = require('nodemailer');



const sendMail = (name, to, sub) => {

      // Create MailTransport.
      const transport = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    });




    transport.sendMail({
        from : 'seoexpartsaddamhossen@gmail.com',
        to : to,
        subject : sub,
        html : `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>email-tamplate</title>
                        <style>
                            body{
                                margin: 0px;
                                padding: 0px;
                                background-color: #e9e9e9;
                                height: 100vh;
                            }
                            .main_wrapper{
                                background-color: #e9e9e9;
                                padding: 20px 0px;
                            }

                            .content_wrapper {
                                background-color: #fff;
                                width: 450px;
                                margin: 100px auto;
                            }

                            .content_wrapper img {
                                width: 100%;
                            }

                            .content_wrapper p {
                                text-align: justify;
                                padding: 10px 20px;
                            }

                            .content_wrapper h1{
                                padding-left: 20px;
                            }

                            .content_wrapper .body a {
                                display: block;
                                text-decoration: none;
                                background-color: black;
                                padding: 10px 0px;
                                margin: 0px auto;
                                text-align: center;
                                color: #0088ED;
                            }

                            .header a img {
                                width: 150px;
                                display: block;
                                margin: 0 auto;
                                padding: 5px 0px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="main_wrapper">
                            <div class="content_wrapper">
                                <div class="header">
                                    <a href="https://sorobindu.com">
                                        <img src="https://sorobindu.com/wp-content/uploads/2022/03/Sorobindu-logo-1.png" alt="">
                                    </a>
                                    <img src="https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=" alt="">
                                    
                                    <div class="body">

                                        <h1> Hi ${name}, you are wellcome to our community</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laudantium iusto vel, at inventore voluptate alias repudiandae beatae error repellendus!</p>

                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem dolorum dolorem repellendus eveniet nostrum earum architecto reiciendis eligendi consequatur ea amet cum dolore numquam temporibus deserunt, perferendis minus repellat facilis, rerum aut natus nobis maiores iure. Mollitia itaque dolorem rerum!</p>

                                        <a href="#">verify your account</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                            `
    });


};


// Exports Modules.
module.exports = sendMail;