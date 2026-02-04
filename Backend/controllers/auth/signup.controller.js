import { User } from "../../models/User.model.js";


// validate email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// validate password
function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return re.test(password)
}

// user sign-up
export const signUp = async(req,res) => {
    try{
        console.log("hii");
        const { username, email, password, confirmPassword } = req.body;

        if(!username || !email || !password || !confirmPassword){
            return res.status(400).json({message : "please fill in all fields"})
        }

       if (username.length < 3) return res.status(400).json({ message: "Your name must be at least 3 letters long" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password did not match" });

        if (!validateEmail(email)) return res.status(400).json({ message: "Invalid emails" });

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
            });
        }

        const existingUser = await User.findOne( {email} );
        if( existingUser ){
            return res.status(409).json({message: "This email is already registered,please signIn"});
        }


        const newUser = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}
