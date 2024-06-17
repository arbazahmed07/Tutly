import axios from "axios"

const apiBaseUri = 'https://api.zoom.us/v2/';
const activity = 'report/activities';
const billing = 'report/cloud_recording';
const cloudRecording = 'report/cloud_recording';
const daily = 'report/daily';
const pastMeetingDetails = 'report/meetings';
const pastMeetingParticipants = 'report/meetings/{meetingId}/participants';

export const activityReport = async(filter:any)=>{
    let activityUri = `${apiBaseUri}${activity}`

    const {data} = await axios({
        url:activityUri,
        method:'get',
        headers:{
            Authorization:`Bearer ${process.env.ZOOM_JWT_TOKEN}`
        }
    }).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
    return data;
}

export const pastMeetingReport = async(meetingId:any)=>{
    let pastMeetingUri = `${apiBaseUri}${pastMeetingDetails}/87627644433/participants?page_size=300&include_fields=registrant_id`
    const {data} = await axios({
        url:pastMeetingUri,
        method:'get',
        headers:{
            Authorization:`Bearer ${process.env.ZOOM_JWT_TOKEN}`
        }
    }).then(res=>{
        return res;
    }).catch(err=>{
        return err;
    })
    return data;
}

export const pastMeetingParticipantsReport = async()=>{
    let pastMeetingParticipantsUri = `${apiBaseUri}${pastMeetingDetails}/87627644433/participants?page_size=300&include_fields=registrant_id`
    let result;
    let pastMeetingParticipantsResult = [];
    do {
        result = await axios({
            url:pastMeetingParticipantsUri,
            method:'get',
            headers:{
                Authorization:`Bearer ${process.env.ZOOM_JWT_TOKEN}`
            }
        }).then(res=>{
            return res
        }).catch(err=>{
            return err;
        })
        if(result.data?.participants) {
            pastMeetingParticipantsResult.push(result.data.participants);
            pastMeetingParticipantsUri+=`&next_page_tokens=${result.data.next_page_tokens}`
        }
    } while(result.data?.next_page_tokens)
    return pastMeetingParticipantsReport;
}