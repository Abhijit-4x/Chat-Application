

export const getTime = (dateString) => {
    const dateTime = new Date(dateString)
    
    let hours = dateTime.getHours()
    let minutes = dateTime.getMinutes()

    const ampm = hours >= 12? 'PM' : 'AM';

    // 24-hour format to 12-hour format
    hours > 12 ? hours -= 12 : (null) ;
    hours = hours.toString()
    
    // Add leading zeros for single-digit minutes
    minutes < 10 ? minutes = '0' + minutes.toString() : minutes = minutes.toString();

    const time = hours + ':' + minutes + ' ' + ampm;
    
    return time;
}