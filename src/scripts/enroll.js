import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const users = await db.user.createMany({
    data:[
      {
          "username": "24075A0101",
          "name": "BONALA VARDHAN",
          "email": "24075A0101@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0102",
          "name": "GONTELA SANTHOSH NARSIMLU",
          "email": "24075A0102@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0103",
          "name": "KAREGIRI KAVYA",
          "email": "24075A0103@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0104",
          "name": "KETHAVATH VENKATESH",
          "email": "24075A0104@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0105",
          "name": "N SAMPATH KUMAR",
          "email": "24075A0105@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0106",
          "name": "RAMAVATH HEMANTH KUMAR",
          "email": "24075A0106@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0107",
          "name": "S AKHIL",
          "email": "24075A0107@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0108",
          "name": "SANIGARAPU RAJU",
          "email": "24075A0108@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0109",
          "name": "EERAPOGU KALYAN ABEL ABIRAM",
          "email": "24075A0109@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0110",
          "name": "KOMPALLY MANOJ",
          "email": "24075A0110@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0111",
          "name": "KORMANI SWAPNA",
          "email": "24075A0111@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0112",
          "name": "MADIRE THRINESH",
          "email": "24075A0112@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0113",
          "name": "MALLUPALLY VARSHITHA",
          "email": "24075A0113@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0114",
          "name": "MEDI VIGNESH",
          "email": "24075A0114@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0115",
          "name": "NEHA",
          "email": "24075A0115@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0201",
          "name": "BANOTHU SHIVA",
          "email": "24075A0201@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0202",
          "name": "BUDIGAM SAI SREE",
          "email": "24075A0202@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0203",
          "name": "CHINTHAKINDI GANESH",
          "email": "24075A0203@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0204",
          "name": "GADANAVENI PRANAY",
          "email": "24075A0204@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0205",
          "name": "GANGARAPU SAI SIDDHARTHA",
          "email": "24075A0205@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0206",
          "name": "GURRALA DEEKSHITHA",
          "email": "24075A0206@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0207",
          "name": "PALEVONI NAVEEN",
          "email": "24075A0207@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0208",
          "name": "TANDURI NOEL",
          "email": "24075A0208@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0209",
          "name": "BOGUDA USHA BHARGAVI",
          "email": "24075A0209@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0210",
          "name": "ETHARGALA VARALAXMI",
          "email": "24075A0210@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0211",
          "name": "GANJAYILA SAITEJA",
          "email": "24075A0211@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0212",
          "name": "GOPAGONI SHRAVANI",
          "email": "24075A0212@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0213",
          "name": "MALYALA KARTHIKEYA",
          "email": "24075A0213@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0214",
          "name": "MOGILICHERLA KARTHIK",
          "email": "24075A0214@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0215",
          "name": "MOHAMMED SAAD IQBAL",
          "email": "24075A0215@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0216",
          "name": "PARALA RAMU",
          "email": "24075A0216@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0301",
          "name": "DIKSHITA SRIVASTAVA",
          "email": "24075A0301@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0302",
          "name": "KARROLA VARSHA",
          "email": "24075A0302@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0303",
          "name": "KUDIPUDI SETHU DURGA NIKHIL",
          "email": "24075A0303@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0304",
          "name": "KURUKURI RAJU",
          "email": "24075A0304@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0305",
          "name": "MUDAVATH VIJAY",
          "email": "24075A0305@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0306",
          "name": "NAGALLA SATYA SHIVA PRASAD",
          "email": "24075A0306@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0307",
          "name": "VADLA SANDEEP KUMAR",
          "email": "24075A0307@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0308",
          "name": "VASALA VIJENDHAR REDDY",
          "email": "24075A0308@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0309",
          "name": "ABHINAY MODEM",
          "email": "24075A0309@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0310",
          "name": "ADUNURI RAGHAVENDRA",
          "email": "24075A0310@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0311",
          "name": "ADUPA NAGARAJU",
          "email": "24075A0311@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0312",
          "name": "BERA NIRMITHA",
          "email": "24075A0312@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0313",
          "name": "DAGAM AGREEMU",
          "email": "24075A0313@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0314",
          "name": "KANTROL MANTHA ASHISH",
          "email": "24075A0314@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0315",
          "name": "RAGULA SAMBA SHIVA",
          "email": "24075A0315@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0316",
          "name": "VANAM LAHARI",
          "email": "24075A0316@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0401",
          "name": "ARNESH CHAUHAN",
          "email": "24075A0401@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0402",
          "name": "JERIPOTHULA LOKESH",
          "email": "24075A0402@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0403",
          "name": "KALLEM KARTHIKEYA RAM",
          "email": "24075A0403@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0404",
          "name": "KANAPARTHI HARSHITHA",
          "email": "24075A0404@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0405",
          "name": "KARKA RACHANA",
          "email": "24075A0405@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0406",
          "name": "KORRI RISHIKA",
          "email": "24075A0406@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0407",
          "name": "SIRISETI PRAVALIKA",
          "email": "24075A0407@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0408",
          "name": "BANOTHU PRAVALIKA",
          "email": "24075A0408@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0409",
          "name": "DASARI NARESH KUMAR",
          "email": "24075A0409@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0410",
          "name": "DONTHARAVENI SUSHMITHA",
          "email": "24075A0410@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0411",
          "name": "GANDLA RACHANA",
          "email": "24075A0411@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0412",
          "name": "MAMILLA VARSHITHA",
          "email": "24075A0412@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0413",
          "name": "MOHAMMAD SANIYA",
          "email": "24075A0413@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0414",
          "name": "NENAVATH CHANTI",
          "email": "24075A0414@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0415",
          "name": "G SAI VARSHITHA",
          "email": "24075A0415@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0416",
          "name": "GADDAM NAVYASRI",
          "email": "24075A0416@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0417",
          "name": "KATAKAM RAJESH",
          "email": "24075A0417@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0418",
          "name": "MADDULA NIKHITHA",
          "email": "24075A0418@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0419",
          "name": "MAHAVEER KATIGHAR",
          "email": "24075A0419@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0420",
          "name": "MUTHYALA SRUJANA",
          "email": "24075A0420@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0421",
          "name": "SEELAM SAMBA SIVA REDDY",
          "email": "24075A0421@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0422",
          "name": "AAGAPU DIVYA",
          "email": "24075A0422@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0423",
          "name": "KATUKAM LAHARI",
          "email": "24075A0423@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0424",
          "name": "MADISHETTI SHASHI PREETH",
          "email": "24075A0424@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0425",
          "name": "RAMULOLLA AVINASH",
          "email": "24075A0425@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0426",
          "name": "TEDDU RAKESH",
          "email": "24075A0426@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0427",
          "name": "THUMU UMA RANI",
          "email": "24075A0427@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0428",
          "name": "V DHIREN CHANDRA",
          "email": "24075A0428@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0501",
          "name": "ALISHETTI VAMSHI KRISHNA",
          "email": "24075A0501@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0502",
          "name": "BALLA KOUSHIK",
          "email": "24075A0502@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0503",
          "name": "DODU RASAGNA",
          "email": "24075A0503@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0504",
          "name": "GORIPARTHI POORNA SAI",
          "email": "24075A0504@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0505",
          "name": "KORMANI ABHILASHA",
          "email": "24075A0505@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0506",
          "name": "MALLEPAKA ASHRITHA",
          "email": "24075A0506@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0507",
          "name": "SUREPALLY SNEHA",
          "email": "24075A0507@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0508",
          "name": "BOMMENA DIVYA",
          "email": "24075A0508@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0509",
          "name": "KUNTA RITHWIKA REDDY",
          "email": "24075A0509@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0510",
          "name": "LAKKARASU AKSHAYA",
          "email": "24075A0510@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0511",
          "name": "M V MOKSHADHA",
          "email": "24075A0511@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0512",
          "name": "MOHAMMED WASEEMUDDIN",
          "email": "24075A0512@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0513",
          "name": "PUTTAPAKA NEERAJ KUMAR",
          "email": "24075A0513@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0514",
          "name": "YERRAMSHETTY SRI CHERNITHA",
          "email": "24075A0514@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0515",
          "name": "ANDE SANATH",
          "email": "24075A0515@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0516",
          "name": "CHINTALA JASWANTH",
          "email": "24075A0516@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0517",
          "name": "GUJJARI SRINIDHI",
          "email": "24075A0517@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0518",
          "name": "KODIRIPAKA PRAVASTHI",
          "email": "24075A0518@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0519",
          "name": "MOTHE RAVIKUMAR",
          "email": "24075A0519@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0520",
          "name": "RAMA VARSHITHA",
          "email": "24075A0520@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0521",
          "name": "BHUKYA MOUNIKA",
          "email": "24075A0521@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0522",
          "name": "BOPPANAPELLY ABHILASH",
          "email": "24075A0522@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0523",
          "name": "DHARMASOTH DIVYA",
          "email": "24075A0523@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0524",
          "name": "NALLA VANSHIKA",
          "email": "24075A0524@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0525",
          "name": "NARLA LAKSHMI SHILPA",
          "email": "24075A0525@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A0526",
          "name": "YANAGANDULA RAVALI",
          "email": "24075A0526@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1001",
          "name": "ANGOTH SWATHI",
          "email": "24075A1001@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1002",
          "name": "KADALI ARUN SAI",
          "email": "24075A1002@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1003",
          "name": "KORAMPALLI RUPASRI",
          "email": "24075A1003@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1004",
          "name": "MAHESH ANIL",
          "email": "24075A1004@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1005",
          "name": "PALLE SNEHA",
          "email": "24075A1005@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1006",
          "name": "REDDIMALLA YAMUNA",
          "email": "24075A1006@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1007",
          "name": "TAKUR ANVITHA",
          "email": "24075A1007@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1008",
          "name": "BANOTHU POOJITHA",
          "email": "24075A1008@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1009",
          "name": "JANGILI AKSHITHA",
          "email": "24075A1009@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1010",
          "name": "KERBAS VEERA ROHAN",
          "email": "24075A1010@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1011",
          "name": "MAINALA RAVI TEJA",
          "email": "24075A1011@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1012",
          "name": "MANDALA LAXMI",
          "email": "24075A1012@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1013",
          "name": "MAYARA UMA MAHESWAR RAO",
          "email": "24075A1013@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1201",
          "name": "CHINTHOJI YESHWANTH KUMAR",
          "email": "24075A1201@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1202",
          "name": "GUNDA RITESH KUMAR",
          "email": "24075A1202@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1203",
          "name": "HAVAPNOUR SUJITH KUMAR",
          "email": "24075A1203@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1204",
          "name": "PEMBARTHI HARSHITHA",
          "email": "24075A1204@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1205",
          "name": "PULGAM AJAY",
          "email": "24075A1205@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1206",
          "name": "SHAIK SIDDIQH AHMED",
          "email": "24075A1206@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1207",
          "name": "VEENAVANKA SRIKAR",
          "email": "24075A1207@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1208",
          "name": "ABBASANI BHAVANI",
          "email": "24075A1208@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1209",
          "name": "BASWARAJU HARIKA",
          "email": "24075A1209@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1210",
          "name": "BYRI SHIVA SHANKAR",
          "email": "24075A1210@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1211",
          "name": "DOMAKONDA NANDINI",
          "email": "24075A1211@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1212",
          "name": "ITHARAVENI KEERTHI",
          "email": "24075A1212@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1213",
          "name": "MD AFREEN",
          "email": "24075A1213@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1214",
          "name": "PATNAM HARITH",
          "email": "24075A1214@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1215",
          "name": "CHAMATLA LEENA",
          "email": "24075A1215@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1216",
          "name": "GANNAVARAPU GAYATRI",
          "email": "24075A1216@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1217",
          "name": "JALLI VIGNESH",
          "email": "24075A1217@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1218",
          "name": "KURRA SAI SHRUTHI",
          "email": "24075A1218@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1219",
          "name": "M UMESH REDDY",
          "email": "24075A1219@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1220",
          "name": "SADHU ARCHITHA",
          "email": "24075A1220@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A1221",
          "name": "SYED TOUSEEF AHMED",
          "email": "24075A1221@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2401",
          "name": "CHAVAN RAJU",
          "email": "24075A2401@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2402",
          "name": "DEVARAKONDA AISHWARYA",
          "email": "24075A2402@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2403",
          "name": "GAMPA SRIDHARSHITH",
          "email": "24075A2403@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2404",
          "name": "K HEMANTH",
          "email": "24075A2404@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2405",
          "name": "KAULAMPET PAVITHRA",
          "email": "24075A2405@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2406",
          "name": "PEDALANKA HARI",
          "email": "24075A2406@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2407",
          "name": "PULLANNAGARI SAI KIRAN",
          "email": "24075A2407@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2408",
          "name": "SAIGANESH NANGUNOORI",
          "email": "24075A2408@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2409",
          "name": "SHAMAKURI RAJEEV",
          "email": "24075A2409@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2410",
          "name": "SINGAM SHETTY SAI VISHAL KUMAR",
          "email": "24075A2410@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2411",
          "name": "TENNETI UDAY PRASHANTH",
          "email": "24075A2411@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A2412",
          "name": "VINJAMURI TANVI",
          "email": "24075A2412@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3201",
          "name": "ANAPARTHI LAVANYA",
          "email": "24075A3201@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3202",
          "name": "DEVISREE BACHU",
          "email": "24075A3202@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3203",
          "name": "KANNURI THRIVEDHA",
          "email": "24075A3203@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3204",
          "name": "KONNE SNEHA",
          "email": "24075A3204@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3205",
          "name": "NARMULA SWETHA",
          "email": "24075A3205@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3206",
          "name": "O MUNISHWAR SAI DARSHITH",
          "email": "24075A3206@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3207",
          "name": "SHEELAM MYTHRI",
          "email": "24075A3207@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A3208",
          "name": "YUVRAJ SINGH",
          "email": "24075A3208@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6201",
          "name": "ARKALA SUNIL",
          "email": "24075A6201@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6202",
          "name": "BACHANNAPETA PREETHI",
          "email": "24075A6202@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6203",
          "name": "BANDAPALLY VAISHNAVI",
          "email": "24075A6203@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6204",
          "name": "DHARMAJI SUSHMA",
          "email": "24075A6204@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6205",
          "name": "JADHAV ANURAG",
          "email": "24075A6205@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6206",
          "name": "PADMA SAI ABHIJITH",
          "email": "24075A6206@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6207",
          "name": "POTHARAJU VINAY",
          "email": "24075A6207@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6208",
          "name": "VYAKARANAM SAI HAASINI",
          "email": "24075A6208@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6601",
          "name": "AKANKSHA BHOSLE",
          "email": "24075A6601@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6602",
          "name": "B ANJALI",
          "email": "24075A6602@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6603",
          "name": "DAMERA SANDEEP",
          "email": "24075A6603@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6604",
          "name": "DANIYA RUB",
          "email": "24075A6604@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6605",
          "name": "MAMINDLAPELLI RAJEEV HRUSHIKESH",
          "email": "24075A6605@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6606",
          "name": "RATHOD PRANATHI",
          "email": "24075A6606@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6607",
          "name": "SHIVANI PUPPALA",
          "email": "24075A6607@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6608",
          "name": "ALLAMLA VAISHNAVI",
          "email": "24075A6608@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6609",
          "name": "GUGULOTH SONIYA",
          "email": "24075A6609@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6610",
          "name": "MATHANGI VIGNAN ADITHYA",
          "email": "24075A6610@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6611",
          "name": "MUDAVATH SRIKANTH",
          "email": "24075A6611@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6612",
          "name": "RAMAGIRI BHARAT RAJ",
          "email": "24075A6612@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6613",
          "name": "SARVASIDDI MAHESWARI",
          "email": "24075A6613@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6614",
          "name": "VISHWANATHA SRI SAI KIRANMAI",
          "email": "24075A6614@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6615",
          "name": "ALLARI SNEHITH",
          "email": "24075A6615@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6616",
          "name": "ANUMULA VARSHINI",
          "email": "24075A6616@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6617",
          "name": "DEVARAKONDA VIVEK",
          "email": "24075A6617@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6618",
          "name": "ELESHETTY DEEPAK",
          "email": "24075A6618@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6619",
          "name": "ENGU BUNNY",
          "email": "24075A6619@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6620",
          "name": "GOUDA SAI THREESHMA",
          "email": "24075A6620@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6621",
          "name": "NEERUDI SARAYU",
          "email": "24075A6621@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6701",
          "name": "GAJJA SRISHANTH",
          "email": "24075A6701@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6702",
          "name": "K MAHESH NAIK",
          "email": "24075A6702@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6703",
          "name": "KUNDA SRI VYSHNAVI REDDY",
          "email": "24075A6703@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6704",
          "name": "MANDALA SRIYA",
          "email": "24075A6704@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6705",
          "name": "ORSU PRAVEEN",
          "email": "24075A6705@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6706",
          "name": "PAGILLA VENU",
          "email": "24075A6706@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6707",
          "name": "VANKUDAVATH NANDINI",
          "email": "24075A6707@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6708",
          "name": "ANUMULA LOKESH RAJU",
          "email": "24075A6708@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6709",
          "name": "MOHAMMAD ZAKI",
          "email": "24075A6709@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6710",
          "name": "PETTEM AKHILVARSH",
          "email": "24075A6710@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6711",
          "name": "RAPELLI DIVYA",
          "email": "24075A6711@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6712",
          "name": "RAYABARAPU AKHILA",
          "email": "24075A6712@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6713",
          "name": "THAMATAM JAYARAJ",
          "email": "24075A6713@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6714",
          "name": "UGGE VYSHNAVI",
          "email": "24075A6714@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6715",
          "name": "GURRAPU BLESSY",
          "email": "24075A6715@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6716",
          "name": "HEEREKAR KRUPIKA",
          "email": "24075A6716@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6717",
          "name": "POLICEPATEL VITTALESHWAR",
          "email": "24075A6717@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6718",
          "name": "PULI AKHIL KUMAR",
          "email": "24075A6718@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6719",
          "name": "RATHOD BHUPENDER",
          "email": "24075A6719@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6720",
          "name": "THATIKONDA LAXMI HARSHITHA",
          "email": "24075A6720@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6721",
          "name": "YALLA SATHWIKA",
          "email": "24075A6721@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6901",
          "name": "BALA SREENIVASULU SRIKANTA",
          "email": "24075A6901@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6902",
          "name": "GUJJULA SAI NAVADEEP REDDY",
          "email": "24075A6902@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6903",
          "name": "KAMBALAPALLY RISHITHA",
          "email": "24075A6903@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6904",
          "name": "PASUPULA SUPRIYA",
          "email": "24075A6904@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6905",
          "name": "POTHARAJU SAHASRA",
          "email": "24075A6905@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6906",
          "name": "THOTAKURI VAISHNAVI",
          "email": "24075A6906@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6907",
          "name": "U GHANNESH",
          "email": "24075A6907@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A6908",
          "name": "YENGAL SAI GURU",
          "email": "24075A6908@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7201",
          "name": "ALLE SUKSHITH",
          "email": "24075A7201@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7202",
          "name": "CHILUVERU SIRI CHANDANA",
          "email": "24075A7202@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7203",
          "name": "DAGGULA VAISHNAVI",
          "email": "24075A7203@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7204",
          "name": "ESLAVATH ASRITHA BAI",
          "email": "24075A7204@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7205",
          "name": "KOTTAMITTAPALLY SHIVAREDDY",
          "email": "24075A7205@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7206",
          "name": "MADDALA CHAITANYA",
          "email": "24075A7206@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      },
      {
          "username": "24075A7207",
          "name": "PRATYUSH KUMAR BARIK",
          "email": "24075A7207@vnrvjiet.in",
          "password":  "$2a$10$i4C98LF5NSlUdatq4XIGRu8FhPbMKURQ929bHlSFspDFaVvqKHm5G"
      }
  ]
  })

  console.log(users);
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
