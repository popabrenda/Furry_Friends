import styles from './UserDetails.module.css';
import {useState} from "react";


const UserDetails = ({user}) => {
    const profilePicture = `data:image/png;base64,${user.profile_picture}`;
    const defaultProfilePicture = "src/icons/user.svg";

    if(user.id ===2){
        console.log(profilePicture);
    }

    return (
        <div className={styles.user}>
            <img className={styles.userChild}
                 alt="imagine profil"
                 src={(!user.profile_picture ) ? defaultProfilePicture : `data:image/png;base64,${user.profile_picture}`}
            />
            <img className={styles.moreHorizontalIcon} alt="" src="src/icons/UserDetails/More_Horizontal.svg"/>

            <div className={styles.frameGroup}>
                <div className={styles.nameAndSurnameParent}>
                    <div className={styles.phoneNumber}>{user.name + " " + user.surname || "Unknown Name"}</div>
                    <img className={styles.telefonIcon} alt="bifa" src="src/icons/UserDetails/on.svg"/>
                </div>
                <div className={styles.age}>{user.age || "Unknown Age"}</div>
            </div>

            <div className={styles.contactParent}>
                <div className={styles.contact}>Contact</div>
                <div className={styles.frameParent}>
                    <div className={styles.telefonParent}>
                        <img className={styles.telefonIcon} alt="telefon" src="src/icons/UserDetails/telefon.svg"/>
                        <div className={styles.phoneNumber}>{user.phone_number || "Unknown Phone Number"}</div>
                    </div>
                    <div className={styles.mailParent}>
                        <img className={styles.telefonIcon} alt="mail" src="src/icons/UserDetails/mail.svg"/>
                        <div className={styles.phoneNumber}>{user.email || "Unknown Email"}</div>
                    </div>
                </div>
            </div>

            <div className={styles.userItem}/>

            <div className={styles.descriptionParent}>
                <div className={styles.contact}>Description</div>
                <div className={styles.suntPasionatDe}>{user.description || "Missing description"}</div>
            </div>

        </div>);
};

export default UserDetails;
