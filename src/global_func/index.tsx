import moment from "moment"
const change_date_format = (item:any)=>{
  return moment(item).format("MMM D YYYY")
}
const change_time_format = (item:any)=>{
 return moment(item, "HH:mm:ssZ").format("hh:mm a")
}
const change_duration_format = (item:any)=>{
 return item.toString().padStart(2, '0') + " hour" 
}
const formatted_Date = (item:any)=>{
  // return moment(item).format("DD-MM-YYYY")
  return moment(item).format("MMMM D, YYYY")
}
const date_formatted = (item: any)=>{
  return moment(item).format("DD-MM-YYYY")
}
const formatted_Date_In_Date_Type = (item: any)=>{
  return moment(item).format("YYYY-MM-DD")
}


export{
  change_date_format,
  change_time_format,
  change_duration_format,
  formatted_Date,
  date_formatted,
  formatted_Date_In_Date_Type
}