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


export{
  change_date_format,
  change_time_format,
  change_duration_format
}