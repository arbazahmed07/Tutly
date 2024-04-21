import {create } from 'zustand';

const ProfileDeatails = create((set) => ({
    profile : '',
    setProfile: (profile :any) => set({profile}),
    clear: () => set({profile: ''})
}));


export default ProfileDeatails;