// const aeSource = `
//  contract EventTickets =
      
//       record events =
//         { uploadAddress  : address,
//           name      : string,
//           eventImg   : string, 
//           eventDetails  : string, 
//           eventPrice   : int }   
//       record state = 
//         { ticket        : map(int, foody),
//           ticketslength : int }
//       entrypoint init() = 
//         { ticket        = {},
//           tickeslength = 0 }
//       entrypoint getevents(index : int) : events = 
//         state.ticket[index]
        
//       entrypoint getTicketslength() : int =
//         state.ticketslength
              
//       stateful entrypoint uploadEvent(name' : string, eventImg' : string, eventDetails' : string, eventPrice' : int) =
//         let tickets = { uploadAddress = Call.caller, name = name', eventImg = eventImg', eventDetails = eventDetails',eventPrice = eventPrice'}
//         let index = getTicketslength() + 1
//         put(state {ticket[index] = ticket, tickestslength = index })
        
// ` ;
const aeSource =`

 contract EventTickets =
  record events =
        { uploadAddress  : address,
          name      : string,
          eventImg   : string, 
          eventDetails  : string, 
          timeStamp   : int;
          eventPrice   : int }  
          
  record state = 
        { ticket        : map(int, events),
          ticketslength : int }
                    
  entrypoint init() = 
        { ticket        = {},
          ticketslength  = 0 }
          
  entrypoint getevents(index : int) : events =   
        state.ticket[index]
        
  entrypoint getTicketslength() : int =
        state.ticketslength
              
  stateful entrypoint uploadEvent(name' : string, eventImg' : string, eventDetails' : string, eventPrice' : int) =
      let tickets = { uploadAddress = Call.caller, name = name', eventImg = eventImg', eventDetails = eventDetails',timeStamp = Chain.timestamp' eventPrice = eventPrice'}
      let index = getTicketslength() + 1
      put(state {ticket[index] = tickets, ticketslength = index })
        
  `;        
     


// ak_2DyzCMbhdFKyrj8BM7JTupovekoRisG98uRELK2mt29dGhF71b
// ak_2LYMoS7HK2qdJ6m5B5n41UdZDx5ZzNgpPP7v4ybVkxQP8aMbVX

      // stateful entrypoint orderFood(index : int) = 
      //   let foodos = getfoody(index)
      //   Chain.spend(foodos.conAddress, Call.value) 

// const contractAddress = 'ct_7W4TBmvpHMpmp95stctgmBQoL9kqh6eLQUZNYRt7uHyiGdKUD';
// const contractAddress = 'ct_2VZeyiXtgLv3zGih9sGEnQMtzojRgcg9WYZtK4VQx7NfzBG2TA';
// const contractAddress = 'ct_SYi6Xg78ZE25vfQcyS1oZsR89zW6sYE2sezBYyTGkYUzuNCnc';
const contractAddress = 'ct_NmD1dHe1zUdiSuq7BfiLzWN4puyv5Nhi3wqUGvNtoedj6q7vt';

var client = null;
var ticketsLength = 0;

var event = [];

// [{"name":"fab","eventImg":"img/Layer.jpg","eventDetails":"abuja blockchain and cryptos.","timeStamp":"10:00:04","eventPrice": 10},
// {"name":"leon","eventImg":"img/Layer.jpg","eventDetails":" blockchain and cryptos.","timeStamp":"10:00:04","eventPrice": 10 }];
  

function renderEvents(){   
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {event});
  $('#sec').html(rendered);
}

// window.onload =  function(event){


//  renderEvents();
//             }


async function callStatic(func, args) {
  //Create a new contract instance that we can interact with
  const contract = await client.getContractInstance(contractCode, {contractAddress});
  //Make a call to get data of smart contract func, with specefied arguments 
  const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));
  console.log('calledGet', calledGet);
  //Make another call to decode the data received in first call
  const decodedGet = await calledGet.decode().catch(e => console.error(e));

  return decodedGet;
}

async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractCode, {contractAddress});
  //Make a call to write smart contract func, with aeon value input
  const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));
  return calledSet;
}
//      async function callOrder(arg){
      
//      }

 window.onload('load', async() => {
   //Display the loader .
  $("#loader").show();

  client = await Ae.Aepp();

  var ticketsLength = await callStatic('getTicketslength', []); 
  console.log(eventsLength)

  for (let i = 1; i <= ticketsLength; i++) {

  const events = await callStatic('getevents', [i]);

 //Fetch event info from blockchain
    event.push({
      name: events.name,
      eventDatails: events.eventdetails,
      ticketPrice: events.ticketPrice,
      eventImg: events.eventImg,
      timeStamp: events.timeStamp,
      index :i,  
    })
  }

     renderEvents(); 
  $("#loader").hide();

  
 //  var x = document.getElementsByClassName('btn');
 //    for (let i = 0; i < x.length; i++) {
     
 //     x[i].addEventListener("click", async function(event){
 //     $("#loader").show();
 //     let template = "{{foodPrice}}",
 //      index = event.target.id,
 //      value = foodArray[i]['foodPrice'];

 
 //  await contractCall('orderFood', [index], value);

 // console.log("order successfull");
 //     var y = document.getElementById('checkOut');

 //     y.style.display ='block';
     
     // y.onsubmit = callOrder(x[i]);
     // y.addEventListener("click", async function(event){
       // await callOrder();
     // })

//   $("#loader").hide();
// });
//  }
// })
