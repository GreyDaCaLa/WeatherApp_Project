//import dayjs from "dayjs";
console.log("Hello Project Start!\n==========\n");
let alldata =[];



// weather api key
// api key: df15110a062d778906f64a4045f9b254

// additional ideas
    // random location weather : Show me some thing random!!!
    // background images weather for current location
    // find weather symbol gifs
    // saved list the the library project
    // Display everything on the weather app site https://openweathermap.org/
    // add map to the main search

// additional ideas that might be hard
    // the sorry that wasn't a place did you mean----- and give options




// maps api key
    //const mapskey = AIzaSyCcCx_W78sAA2cVAunNJV8nunJ-XnDIeNw




//test results
    // test1URL = https://api.openweathermap.org/data/2.5/weather?q=Grand%20Rapids&appid=df15110a062d778906f64a4045f9b254
    // test1Res = {"coord":{"lon":-85.6681,"lat":42.9634},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":296.67,"feels_like":296.36,"temp_min":295.14,"temp_max":297.72,"pressure":1009,"humidity":49},"visibility":10000,"wind":{"speed":0.89,"deg":287,"gust":3.13},"clouds":{"all":20},"dt":1630883737,"sys":{"type":2,"id":2005020,"country":"US","sunrise":1630840316,"sunset":1630887061},"timezone":-14400,"id":4994358,"name":"Grand Rapids","cod":200}


//console.log("initial text");
//let tRes1 = {"coord":{"lon":-85.6681,"lat":42.9634},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":296.67,"feels_like":296.36,"temp_min":295.14,"temp_max":297.72,"pressure":1009,"humidity":49},"visibility":10000,"wind":{"speed":0.89,"deg":287,"gust":3.13},"clouds":{"all":20},"dt":1630883737,"sys":{"type":2,"id":2005020,"country":"US","sunrise":1630840316,"sunset":1630887061},"timezone":-14400,"id":4994358,"name":"Grand Rapids","cod":200};
//console.log(tRes1);
//console.log("----------end");

//console.log("after json -ing");
//console.log(tRes1.json());
//console.log("----------end2");


function DateTimeMath(origstamp){
    // console.log("=================================datemath")

    // console.log("origstamp");
    // console.log(origstamp);
    let extra = "am"

    let tesdate= new Date(origstamp*1000);
    // console.log("tesdate");
    // console.log(tesdate);

    teshour = tesdate.getHours();
    // console.log("teshour");
    // console.log(teshour);

    if(teshour>12){
        teshour = teshour-12;
        // console.log("teshour")
        // console.log(teshour)
        extra="pm"

    }

    let oldstring = new Date(origstamp*1000).toUTCString();


    let s1 = new Date(origstamp*1000).toUTCString().slice(0,17);
    // console.log("s1");
    // console.log(s1);


    // console.log(origstamp)
    let s2 = new Date(origstamp*1000).toUTCString().slice(19,22);
    // console.log("s2");
    // console.log(s2 +extra);

    let fullstring = s1 + teshour+s2+extra;
    // console.log("fullstring")
    // console.log(fullstring)




    // console.log("=================================datemath")

    return fullstring



}

// function resBuild() {
//     let newResdiv = document.createElement("div");
//     newResdiv.id = "newResDiv";
//     newResdiv.className = "ResDiv";

//     let newResCont = document.getElementById("NewResultsContainer");


// }



let map;

function initMap(markerloc) {
    //{"lon":-85.6681,"lat":42.9634}
    //const centloc = { lat: -34.397, lng: 150.644 }; 
  map = new google.maps.Map(document.getElementById("NewResultMap"), {
    center: markerloc,
    zoom: 5,
    mapId: 'dadbb3dd8e70f819',
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });

  const marker = new google.maps.Marker({
    position: markerloc,
    map: map,
  });
}

function initMapHelper() {
    initMap({ lat: alldata[alldata.length-1].loc.lat, lng: alldata[alldata.length-1].loc.lon });

}

function dispMap () {
    let mb = document.getElementById("mainbody");
        
    let ScriptForMap = document.getElementById("ScriptForMap");
    if(!ScriptForMap){
        let newsp = document.createElement("script");
        newsp.id = "ScriptForMap";
        newsp.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAVhci_tWeb5SkWp7jcpfMaWKfb-rGYUxk&map_ids=dadbb3dd8e70f819&callback=initMapHelper'
        newsp.async = true;
        
        mb.appendChild(newsp);
    }
    else{
        initMapHelper();
    }
    
}

async function fetchweatherdata() {
    
    // console.log("--------get weatehr data start ----------");
    let weatherkey = 'df15110a062d778906f64a4045f9b254'
    
    let sch_city = document.getElementById("SearchCity").value;
    let sch_state = document.getElementById("SearchState").value;
    console.log(`search city: ${sch_city}`);
    console.log(`Search State: ${sch_state}`);

    document.getElementById("SearchCity").value ="";
    document.getElementById("SearchState").value="";

    let urlweather = `https://api.openweathermap.org/data/2.5/weather?q=${sch_city},${sch_state}&appid=${weatherkey}&units=imperial`
    console.log(`Full-URL ---- ${urlweather}`);
    let giveback =null;

    await fetch(
        urlweather,
        {mode: "cors"}
    )
    .then(function(response) {
        // console.log("first then-------------------------------");
        // console.log(response);
        //console.log("loggin jason------")
        //console.log(response.json());
        giveback = response.json();
        return response;
    })
    .catch(function(reject) {
        console.log("only catch-------------------------------");
        console.log(reject);
    });

    // console.log("===============================When you see it")
    return giveback;

}

class Wdata {
    constructor(data){
        this.loc= data.coord
        this.locname = {
            "city": data.name,
            "country": data.sys.country
        
        }
        this.weather = data.weather
        this.temps = {
            "temp": data.main.temp,
            "feels_like": data.main.feels_like,
            "temp_min": data.main.temp_min,
            "temp_max": data.main.temp_max,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "visibility": data.visibility
        },
        this.wind = data.wind
        this.clouds = data.clouds
        this.time_calc= DateTimeMath(data.dt);
        this.time_stamp
        this.time_zone = data.timezone
        this.saved = false;

    }
}


let fillerdata = {
    "coord": {
        "lon": 0,
        "lat": 0
    },
    "weather": [
        {
            "id": 0,
            "main": "Nada",
            "description": "Nada",
            "icon": "50n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "humidity": 0
    },
    "visibility": 0,
    "wind": {
        "speed": 0,
        "deg": 0,
        "gust": 0
    },
    "clouds": {
        "all": 0
    },
    "dt": 0,
    "sys": {
        "type": 2,
        "id": 2005020,
        "country": "Data",
        "sunrise": 1631013246,
        "sunset": 1631059649
    },
    "timezone": -14400,
    "id": 4994358,
    "name": "Bad Search",
    "cod": 200
}

function gettestResultdata(choice =2) {
   let tes = {
        "coord": {
            "lon": -85.6681,
            "lat": 42.9634
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 301.1,
            "feels_like": 302.31,
            "temp_min": 296.38,
            "temp_max": 302.62,
            "pressure": 1004,
            "humidity": 58
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.68,
            "deg": 261,
            "gust": 6.26
        },
        "clouds": {
            "all": 100
        },
        "dt": 1631041154,
        "sys": {
            "type": 2,
            "id": 2005020,
            "country": "US",
            "sunrise": 1631013246,
            "sunset": 1631059649
        },
        "timezone": -14400,
        "id": 4994358,
        "name": "Grand Rapids",
        "cod": 200
    }

    let tes2={
        "cod":"404",
        "message":"city not found"
    };

    if(choice ==1 ){
        // console.log("using test result 1 GR")
        return tes;
    }else{
        // console.log("using test result 2 bad res")
        return tes2;
    }

}

async function getweatherdata() {

    let fetchresultwasgood = false;

    let data = await fetchweatherdata();
    //let data = gettestResultdata(1);

    if(data.message){
        // alldata.unshift(new Wdata(fillerdata));
        //alldata.push(new Wdata(fillerdata));
        console.log("Bad Search all data shouldnt grow");
    }else{
        // alldata.unshift(new Wdata(data));
        alldata.push(new Wdata(data));
        // console.log(alldata);
        fetchresultwasgood = true;

    }
    console.log("===All Data Start=====");
    console.log(alldata);
    console.log("===All Data End=====");
    disp_MainData(fetchresultwasgood);
    disp_OldData(fetchresultwasgood);
    

}

function disp_MainData(goodRes=false){
    
    let newrescont = document.getElementById("NewResultsContainer");

    let maindiv = document.getElementById("maindiv");

    let erase_resText = document.getElementById("NewResultText");
    if(erase_resText){
        newrescont.removeChild(erase_resText);
    }

    let erase_BadresText = document.getElementById("BadNewResultText");
    if(erase_BadresText){
        newrescont.removeChild(erase_BadresText);
    }

    let erase_resMap = document.getElementById("NewResultMap");
    if(erase_resMap){
        newrescont.removeChild(erase_resMap);
    }

    let noSearch = document.getElementById("NoSearch");
    if(noSearch){
        maindiv.removeChild(noSearch);
    }

    let arrayID= alldata.length -1;


    if(goodRes){

    

        let nRTextdiv = document.createElement("div");
        nRTextdiv.id = "NewResultText";
        nRTextdiv.className = "NRItem";



            let datepdiv = document.createElement("div");
            datepdiv.id= "DatePlace";
            //datepDiv.className= "";

                let dateTime = document.createElement("h4");
                dateTime.innerHTML = alldata[arrayID].time_calc;
                let datePlace = document.createElement("h3");
                datePlace.innerHTML = `${alldata[arrayID].locname.city}, ${alldata[arrayID].locname.country}`;   

            datepdiv.appendChild(dateTime);
            datepdiv.appendChild(datePlace);


        nRTextdiv.appendChild(datepdiv); // 1 of 3


            let tempSdiv = document.createElement("div");
            tempSdiv.id= "TempAndSymbol";
            //datepDiv.className= "";


                let temp_p= document.createElement("p");
                temp_p.id = "temp";
            
                let temp_img = document.createElement("img");
                temp_img.src = "https://openweathermap.org/img/wn/"+alldata[arrayID].weather[0].icon+"@2x.png";
                temp_img.alt = "Weather Icon Image";
            
                temp_p.appendChild(temp_img);
                temp_p.innerHTML = temp_p.innerHTML+ alldata[arrayID].temps.temp + "°F";


            tempSdiv.appendChild(temp_p);




        nRTextdiv.appendChild(tempSdiv); // 2 of 3


            let tempdesdiv = document.createElement("div");
            tempdesdiv.id ="TempDesDiv";

            let tempdesdiv_p1 = document.createElement("p");
            tempdesdiv_p1.id = "TempDes";
            tempdesdiv_p1.innerHTML = `Feels like ${alldata[arrayID].temps.feels_like}°F. ${alldata[arrayID].weather[0].description}`;
            
            let tempdesdiv_p2 = document.createElement("p");
            tempdesdiv_p2.id = "TempExrtaInfo";
            tempdesdiv_p2.innerHTML = `WindSpeed:${alldata[arrayID].wind.speed}mph | Humidity:${alldata[arrayID].temps.humidity}% | Visibility:${alldata[arrayID].temps.visibility}miles`;

            tempdesdiv.appendChild(tempdesdiv_p1);
            tempdesdiv.appendChild(tempdesdiv_p2);




        nRTextdiv.appendChild(tempdesdiv); // 3 of 3

        newrescont.appendChild(nRTextdiv);

        let nRMapdiv = document.createElement("div");
        nRMapdiv.id = "NewResultMap";
        nRMapdiv.className = "NRItem";

        newrescont.appendChild(nRMapdiv);

        dispMap();

    }else{
        let hbadres = document.createElement("h5");
        hbadres.innerHTML = "THAT WAS A BAD SEARCH TRY AGAIN";
        hbadres.id = "BadNewResultText";

        newrescont.appendChild(hbadres);



    }




}

function disp_OldData(goodRes=false){
    // console.log("===============================Within Old Data");
    // console.log("alldata current length");
    // console.log(alldata.length);
    // console.log("alldata[1].locname.city------");
    // console.log(alldata[1].locname.city);




    if(alldata.length>=1 && goodRes ){
        // console.log("alldata[1].locname.city------");
        // console.log(alldata[1].locname.city);
        let data = null;

        let oldCont = document.getElementById("OldResultsContainer");
        let oldRes;

        let oldDate;
        let oldDate_h4;
        let oldDate_h3;


        let oldSym;
        let oldSym_img;

        let oldTemp;
        let oldTemp_p;
        let before;

        let oldSave;
        let oldSave_b;


        data = alldata[alldata.length-1];

        // console.log(data);

        before = document.getElementById("OldResult"+(alldata.length-2));
        // if(!before){
        //     for(let i = alldata.length-2; i>0 && !before; i--){
        //         // console.log("in loop for before---"+(i));
        //         before = document.getElementById("OldResult"+i);
                
        //     }
        // }



        oldRes = document.createElement("div");
        oldRes.id = "OldResult"+ (alldata.length-1);
        oldRes.className = "ORItem"

        //================making old date 
        oldDate =  document.createElement("div");
        oldDate.id= "OldDatePlace";
        oldDate.className="ORItemItem";

        oldDate_h4= document.createElement("h4");
        oldDate_h4.innerHTML = data.time_calc;
        oldDate.appendChild(oldDate_h4);
        oldDate_h3 = document.createElement("h3");
        oldDate_h3.innerHTML = `${data.locname.city}, ${data.locname.country}`;
        oldDate.appendChild(oldDate_h3);

        oldRes.appendChild(oldDate);


        //==============makeing old sym
        oldSym =  document.createElement("div");
        oldSym.id= "OldSymbol";
        oldSym.className="ORItemItem";


        oldSym_img= document.createElement("img");
        oldSym_img.alt = "Weather Icon";
        oldSym_img.src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";

        oldSym.appendChild(oldSym_img);

        oldRes.appendChild(oldSym);




        //===================Making Old Temp
        oldTemp =  document.createElement("div");
        oldTemp.id= "OldTemp";
        oldTemp.className="ORItemItem";

        oldTemp_p = document.createElement("p");
        oldTemp_p.innerHTML = data.temps.temp +"°F";

        oldTemp.appendChild(oldTemp_p);

        oldRes.appendChild(oldTemp);


        //=======================Making old Sav
        oldSave =  document.createElement("div");
        oldSave.id= "OldSave";
        oldSave.className="ORItemItem";

        oldSave_b = document.createElement("button");
        oldSave_b.innerHTML = "Save";
        let globalvar_fix = alldata.length-1;
        oldSave_b.addEventListener("click",function(){MoveToSave(globalvar_fix)});

        oldSave.appendChild(oldSave_b);

        oldRes.appendChild(oldSave);







        let noPastSearch = document.getElementById("NoPastSearches");
        if(noPastSearch){
            maindiv.removeChild(noPastSearch);
        }

        if(before){
            oldCont.insertBefore(oldRes,before)

        }else{
            oldCont.appendChild(oldRes);
        }




        

    }



}

function disp_SavedData(addRemove,id){
    console.log(`===Within Saved Data--- ${addRemove}---${id}`);
    let maindiv = document.getElementById("maindiv")
    let saveCont= document.getElementById("SavedResultsContainer");

    if(addRemove == "Add" ){
        let data = null;

        // saveCont = document.getElementById("SavedResultsContainer");
        let saveRes;

        let saveDate;
        let saveDate_h4;
        let saveDate_h3;

        let saveRemove;
        let saveRemove_b;

        let saveRefetch;
        let saveRefetch_b;


        data = alldata[id];



        saveRes = document.createElement("div");
        saveRes.id = "SavedResult"+ id;
        saveRes.className = "SRItem";

        //================making save date 
        saveDate =  document.createElement("div");
        saveDate.id= "SavedDatePlace";
        saveDate.className="SRItemItem";

        saveDate_h4= document.createElement("h4");
        saveDate_h4.innerHTML = data.time_calc;
        saveDate.appendChild(saveDate_h4);
        saveDate_h3 = document.createElement("h3");
        saveDate_h3.innerHTML = `${data.locname.city}, ${data.locname.country}`;
        saveDate.appendChild(saveDate_h3);

        saveRes.appendChild(saveDate);

        //=======================Making save remove
        saveRemove =  document.createElement("div");
        saveRemove.id= "SavedRemove";
        saveRemove.className="SRItemItem";

        saveRemove_b = document.createElement("button");
        saveRemove_b.innerHTML = "Remove";
        saveRemove_b.addEventListener("click",function(){disp_SavedData("Remove",id)});

        saveRemove.appendChild(saveRemove_b);

        saveRes.appendChild(saveRemove);




        //=====================Making save ReFetch
        saveRefetch =  document.createElement("div");
        saveRefetch.id= "SavedReFetch";
        saveRefetch.className="ORItemItem";

        saveRefetch_b = document.createElement("button");
        saveRefetch_b.innerHTML = "ReFetch";
        // let globalvar_fix = alldata.length-1;
        saveRefetch_b.addEventListener("click",function(){Refetch(id)});

        saveRefetch.appendChild(saveRefetch_b);

        saveRes.appendChild(saveRefetch);







        // let noSavedSearch = document.getElementById("NoSavedSearches");
        // if(noSavedSearch){
        //     maindiv.removeChild(noSavedSearch);
        // }
        
        
        saveCont.appendChild(saveRes);




        

    }
    if(addRemove == "Remove"){

        let remSavRes = document.getElementById("SavedResult"+id);
        saveCont.removeChild(remSavRes);


    }


    let allsavedchildren = document.getElementById("SavedResultsContainer").children;

    console.log(allsavedchildren)
    let getrid= document.getElementById("NoSavedSearches");
    console.log(`length of children ${allsavedchildren.length}`)
    if(allsavedchildren.length>0){
        if(getrid){
            maindiv.removeChild(getrid);

        }

    }else{
        if(!getrid){
            let newtext = document.createElement("h5");
            newtext.id = "NoSavedSearches"
            newtext.innerHTML="No Saved Searches";
            maindiv.insertBefore(newtext,saveCont);

        }

    }
    



}



function MoveToSave(slot){
    console.log("Within move to save==========")
    console.log(`
    Alldata.length = ${alldata.length}
    slot = ${slot}`);

    let found = false;

    let allsaved = document.getElementsByClassName("SRItem");
    let theold = document.getElementById("OldResult" + slot);

    for(saved of allsaved){
        console.log(`Comparing: 1:${saved.children[0].children[1].innerHTML} |2:${theold.children[0].children[1].innerHTML}`)
        if(saved.children[0].children[1].innerHTML == theold.children[0].children[1].innerHTML){
            found = true;
        }

    }


    if(!found){
        console.log("===========Not Found")
        disp_SavedData("Add",slot);

    }





}

function Refetch(id){


    // let re_city = document.getElementById("SearchState");
    // let re_country = document.getElementById("SearchState");
    document.getElementById("SearchCity").value=alldata[id].locname.city
    document.getElementById("SearchState").value=alldata[id].locname.country
    // saved.children[0].children[1].innerHTML == theold.children[0].children[1].innerHTML
    getweatherdata();





}


