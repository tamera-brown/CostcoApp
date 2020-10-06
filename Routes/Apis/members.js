const express=require('express');
const router=express.Router();
const uuid=require('uuid');
const memberList=require('../../MemberList');

// Get Single Member
router.get('/:id',(req,res)=>{
    const found=memberList.some(member=>member.id===parseInt(req.params.id))

    if(found){
    res.json(memberList.filter(member=>member.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});


// Get All Members
router.get('/', (req,res)=>{
  res.json(memberList);
});


//Create a member
router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        membershipType: req.body.membershipType,
        membershipStatus: "active"
    }

    if(!newMember.name || ! newMember.email){
        res.status(400).json({msg: "Please include Name & Email"})
    }
    else{
        memberList.push(newMember);
        //res.send(memberList);
        res.redirect('/');
        res.json({msg: "Member Successfully added"});
    }
    res.send(req.body);
});


// Update Member
router.put('/:id',(req,res)=>{
    const found=memberList.some(member=>member.id===parseInt(req.params.id))

    if(found){
        const updateMember=req.body;
        memberList.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updateMember.name ? updateMember.name : member.name;
                member.email=updateMember.email ? updateMember.email : member.email;
                member.membershipType=updateMember.membershipType ? updateMember.membershipType : member.membershipType;
                member.membershipStatus=updateMember.membershipStatus ? updateMember.membershipStatus : member.membershipStatus;

                res.json({msg: "Member updated", member});

            }
        });
    }
    else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }

    
});


//Delete a member
router.delete('/:id',(req,res)=>{
    const found=memberList.some(member=>member.id===parseInt(req.params.id))

    if(found){
    res.json({msg: 'Member deleted ',member: memberList.filter(member=>member.id !==parseInt
        (req.params.id))});
    }
    else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports=router;