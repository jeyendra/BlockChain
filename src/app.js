
var numOfEvents = 0 

var total_events;

web3= new Web3(window.web3.currentProvider); 

var contractAddress='0xeA96197d1b93B42c6A262aD314AA73742C4531b7';

var address_html_element = document.getElementById('decentralized_address');

var currentDecentralizedAddress;

var Contract_abi;
var FundRaisingContract;
var claims;

if(window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
        window.location.reload();
    });
}

async function getCurrentAccount(){
    const acc = await ethereum.request({ method: 'eth_requestAccounts'});
    return acc[0];
}

Contract_abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "CreatedBy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "required_amount",
				"type": "uint256"
			}
		],
		"name": "create_Event",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "submitClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eventid",
				"type": "uint256"
			}
		],
		"name": "transfer_Funds_to_fundRaiser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Claims_List",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "claim_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "event_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "FundRasingEvents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "CreatedBy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "required_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collected_amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "get_claim_details",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_smart_contract_balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_total_events",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getEventDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
FundRaisingContract = new web3.eth.Contract(Contract_abi,contractAddress);
getCurrentAccount().then((value)=>{address_html_element.innerHTML+=value; currentDecentralizedAddress = value; getClaimDetails();});


function clickdonate(btn_id){
    btn_id = btn_id.split(' ')
    btn_id = btn_id[0].replace("b","")
    console.log(btn_id)
    amount = document.getElementById("donate_amount"+btn_id).value
    console.log(amount)
    // amount= parseFloat(amount)
    amount = web3.utils.toWei(amount)
    title = document.getElementById("title_"+btn_id).innerHTML;
    console.log(title)
    receiver = document.getElementById("createdby_"+btn_id).innerHTML;
    console.log(receiver)
    var tmp = async function(){ 
        try{
            // numOfEvents++
            // console.log(currentAccount)
            // console.log(receiver)
            // cons
            return await FundRaisingContract.methods.transfer_Funds_to_fundRaiser(currentDecentralizedAddress, receiver, btn_id).send({from:currentDecentralizedAddress, value: amount})
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            window.location.reload();
            alert("Success");
        }
    });
    
}

// function listEvents(){
//     console.log("first entered")

//     console.log(numOfEvents)
//     for(let i=0;i<20;i++){
//         var tmp = async function(){ 
//            something :try{
//                 var val = await CrowdfundingContract.methods.getEventDetails(i).call()
//                 console.log(val)
//                 numOfEvents++;
//                 if(val["0"] == false){
//                     console.log("Jay")
//                     flag_event = 0
//                     tmp.resolve()
//                 }else{
//                     var eve = document.createElement("div");
//                     eve.className="box"
//                     var labe = document.createElement("label");
//                     labe.innerHTML = "title=" + val[1];
//                     labe.id = "title_" + i;
//                     labe.className = "label level-item"
//                     eve.appendChild(labe)
                    
//                     var labe = document.createElement("label");
//                     labe.innerHTML = "description" + val[2];
//                     labe.className = "label level-item"
//                     eve.appendChild(labe)
                    
//                     var labe = document.createElement("label");
//                     labe.innerHTML = "CreatedBy" + val[3];
//                     labe.id = "createdby_" + i;
//                     labe.className = "label level-item"
//                     eve.appendChild(labe)
                    

//                     var labe = document.createElement("label");
//                     labe.innerHTML = "required_amount:" + val[4];
//                     labe.className = "label level-item"
//                     eve.appendChild(labe)
                    

//                     var labe = document.createElement("label");
//                     labe.innerHTML = "collected_amount:" + val[5];
//                     labe.className = "label level-item"
//                     eve.appendChild(labe)
                    
//                     var prog = document.createElement("progress")
//                     prog.className="progress level-item"
//                     prog.value = 30
//                     prog.max = val[4]
//                     eve.append(prog);


//                     var span = document.createElement('span');
//                     span.innerHTML = `<button id="b${i} button is-warning" onclick="clickdonate(this.id)">Donate `; 
//                     eve.append(span)

//                     var ip = document.createElement("input")
//                     ip.text="number"
//                     ip.id="donate_amount" + i
//                     eve.append(ip)

//                     var element = document.getElementById("event_list");

//                     element.appendChild(eve);
//                 }
//             } 
//             catch(e){
//                 success=0;
//                 console.log("Transaction failed");
//                 return
//             }
//         }
//         console.log("hello")
//         tmp().then((val)=>{
//             console.log(val);
//             if(success==1){
//                 console.log("Success");
//             }
//         });
//         console.log("Jeyendraa")
//     }
// }


async function getTotalevents(){
    var success = 1
    var tmp = async function(){ 
        try{
            console.log("hereherehere")
             var val = await FundRaisingContract.methods.get_total_events().call()
             total_events = parseInt(val)
             numOfEvents++;
         } 
         catch(e){
             success=0;
             console.log("Transaction failed");
             return
         }
     }
     tmp().then((val)=>{
         if(success==1){
             console.log("Success");
         }
     });    
}

function listEvents(){
    console.log("entered seond")
    getTotalevents()
    console.log(total_events)
    for(let i=0;i<20;i++){
        var tmp = async function(){ 
            try{
                var val = await FundRaisingContract.methods.getEventDetails(i).call()
                console.log(val)
                numOfEvents++;
                if(val["0"] == false){
                    console.log("Jay")
                    flag_event = 0
                    tmp.resolve()
                }else{
                    var outer_div = document.createElement("div")
                    outer_div.className="box child"

                    var span1 = document.createElement("span") 
                    span1.id = "title_"+i
                    span1.innerHTML = val[1]
                    outer_div.appendChild(span1)
                    outer_div.appendChild(document.createElement("br"))
                    

                    var span2 = document.createElement("span") 
                    span2.id = "description_"+i
                    span2.innerHTML = val[2]
                    outer_div.append(span2)
                    outer_div.appendChild(document.createElement("br"))
                    
                    
                    var span3 = document.createElement("span") 
                    span3.id = "createdby_"+i
                    span3.innerHTML = val[3]
                    outer_div.appendChild(span3)
                    outer_div.appendChild(document.createElement("br"))
                    
                    var span4 = document.createElement("span");
                    span4.innerHTML = "required_amount:" + val[4];
                    outer_div.appendChild(span4)
                    outer_div.appendChild(document.createElement("br"))
                    

                    var span5 = document.createElement("span");
                    span5.innerHTML = "collected_amount:" +  parseInt(val[5])/1000000000;
                    outer_div.appendChild(span5)
                    outer_div.appendChild(document.createElement("br"))
                    

                    var prog = document.createElement("progress")
                    prog.className="progress level-item"
                    prog.max = val[4]
                    prog.value = val[5]
                    outer_div.append(prog);
                    outer_div.appendChild(document.createElement("br"))


                    var span = document.createElement('span');
                    span.innerHTML = `<button id="b${i}" class="btn btn-primary btn-sm" onclick="clickdonate(this.id)">Donate `; 
                    outer_div.append(span)

                    var ip = document.createElement("input")
                    ip.id="donate_amount" + i
                    outer_div.append(ip)

                    var element = document.getElementById("event_list");
                    element.appendChild(outer_div);
                }
            } 
            catch(e){
                success=0;
                console.log("Transaction failed");
                return
            }
        }
        tmp().then((val)=>{
            console.log(val);
            if(success==1){
                console.log("Success");
            }
        });
        console.log("Jeyendraa")
    }

}


function Donate(title, description , amount){
    console.log("enetered into  donate");
    console.log(title)
    console.log(description)
    console.log(amount)
    var success=1;
    var tmp = async function(){ 
        try{
            numOfEvents++
            return await FundRaisingContract.methods.create_Event(title , description, currentDecentralizedAddress,amount).send({from:currentDecentralizedAddress})
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            window.location.reload();
            alert("Success");
        }
    });

}

function ListClaims(){
    var success = 1;
    for(let i=1;i<20;i++){
        var tmp = async function(){ 
            try{
                var val = await FundRaisingContract.methods.get_claim_details(i).call()
                console.log(val)
                if(val["0"] == false){
                    tmp.resolve()
                }else{
                    var desc = val[1]
                    var don_addr = val[2]
                    var rec_addr = val[3]
                    var titl = val[4]
                    var amt = val[6]
                    var out_div = document.createElement("div")
                    out_div.className = "box"

                    var lab = document.createElement("span")
                    lab.innerHTML = titl;
                    lab.className = "tag is-danger is-light"
                    out_div.append(lab);
                    out_div.appendChild(document.createElement("br"))


                    var lab = document.createElement("span")
                    lab.className = "tag is-success is-light is-large"
                    lab.innerHTML = don_addr + " donated " + amt + " wei";
                    out_div.append(lab);
                    out_div.appendChild(document.createElement("br"))
                    out_div.appendChild(document.createElement("br"))

                    
                    if(rec_addr.toLowerCase() == currentDecentralizedAddress && desc == "none"){
                        console.log("added texta")
                        var texta = document.createElement("textarea");
                        texta.id = "textarea_" + i
                        texta.className="textarea"
                        out_div.append(texta)
                        out_div.appendChild(document.createElement("br"))

                        var span = document.createElement('span');
                        span.innerHTML = `<button id="sc${i}"  class="button is-primary level-right" onclick="submit_claim(this.id)">SubmitClaim`;    
                        out_div.append(span) 
                    }else {
                        if(desc != "none"){
                            var lab = document.createElement("label")
                            lab.innerHTML = desc
                            out_div.append(lab);
                            out_div.append(document.createElement("br"))
                        }
                    }

                    claimList = document.getElementById("claim_list")
                    claimList.append(out_div)  
                }
            } 
            catch(e){
                success=0;
                console.log("Transaction failed");
                return
            }
        }
        tmp().then((val)=>{
            console.log(val);
            if(success==1){
                console.log("Success");
            }
        });   
    }
}


function submit_claim(id){
    id = id.replace("sc","");
    console.log(id)
    desc = document.getElementById("textarea_"+ id).value;
    var tmp = async function(){ 
        try{
            await FundRaisingContract.methods.submitClaim(desc, id).send({from:currentDecentralizedAddress});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });
}