export interface UploadPicDataDTO {
    userId: string;
    profilePic: string;
}

export interface UpdateBioDTO {
    userId: string;
    bio: string;
}

export interface ChangePasswordDTO {
    oldPassword: string;
    newPassword: string;
}
