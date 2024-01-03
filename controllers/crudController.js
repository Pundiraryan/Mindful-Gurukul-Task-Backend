const User = require("../models/User");

// Display All crud Data
const crud_index = async (req, res) => {
	const allusers= await User.find();
	if(allusers){
		res.json(allusers);
	}else{
		console.log("no user found");
	}
};

const searchuser=async (req,res)=>{
	try {
		console.log(req.params);
		const searchcategory=(req.params.searchcategory);
		const searchval=(req.params.searchval);
		var allusers;
		if(searchcategory==='name'){
			allusers=await User.find({name:searchval});
		}else if(searchcategory==='email'){
			allusers=await User.find({email:searchval});
		}
		else if(searchcategory=='phone'){
			allusers=await User.find({phone:searchval});
		}


		if(allusers){
			console.log(allusers);
			res.json(allusers);
		}else{
			console.log("no user found");
		}
	} catch (error) {
		console.log(error);
	}
}
// Create New crud
const crud_create_post = async (req, res) => {
	try {
		const crud = new User(req.body);
		const ack=await crud.save();
		if(ack){
			res.send(crud);
		}else{
			res.status(422).send("crud add failed");
		}
	} catch (error) {
		console.log(error);
	}
};

// Show a particular crud Detail by Id
const crud_details = async (req, res) => {
	try {
		const detail=await User.findById(req.params.id);
		res.json(detail);
	} catch (error) {
		console.log(error);
	}
	
};

// Update crud Detail by Id
const crud_update = async (req, res) => {
	try {
		const obj={
			date:Date.now(),
			modified:true
		}
		const curr=await User.findByIdAndUpdate(req.params.id,obj);
		await curr.save();
		if(curr){
			console.log('updated and saved');
		}
		await curr.save
		const result=await User.findByIdAndUpdate(req.params.id, req.body);
		if(result){
			res.json("crud updated");
		}else{
			res.status(422).send("crud update failed.");
		}
		
	} catch (error) {
		console.log(error);
	}
};

// Delete crud Detail by Id
const crud_delete = async (req, res) => {
	try {
		const usertodelete=await User.findById(req.params.id);
		if(!usertodelete){
			res.status(404).send("crud not found");
		}else{
			const result=await User.findByIdAndDelete(req.params.id);
			if(result){
				console.log(result);

				res.status(200).json("crud deleted");
			}else{
				res.status(400).send("crud delete failed.");
			}
		}
	} catch (error) {
		console.log(error);
	}
};
const filterproducts= async(req,res)=>{
	try {
		const fcategory=req.params.category;
		if(fcategory==="nameasc"){
			const allusers= await User.find().sort({name:1});
			if(allusers){
				res.json(allusers);
			}else{
				console.log("no user found");
			}
		}else if(fcategory==="namedsc"){
			const allusers= await User.find().sort({name:-1});
			if(allusers){
				res.json(allusers);
			}else{
				console.log("no user found");
			}
		}
		else if(fcategory==="lastmodified"){
			const allusers= await User.find({modified:false}).sort({date:-1});
			if(allusers){
				res.json(allusers);
			}else{
				res.json("no user yet updated");
			}
		}
		else if(fcategory=="lastinserted"){
			const allusers= await User.find().sort({date:-1});
			if(allusers){
				res.json(allusers);
			}else{
				console.log("no user found");
			}
		}

	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	crud_index,
	crud_details,
	crud_create_post,
	crud_update,
	crud_delete,
	filterproducts,
	searchuser
};
