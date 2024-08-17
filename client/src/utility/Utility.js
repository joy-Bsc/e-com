import Swal from 'sweetalert2';

export function unauthorized(code) {
    if (code === 401) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/login';
    }
}

export function setEmail(email) {
    localStorage.setItem('email', email);
}

export function getEmail() {
    return localStorage.getItem('email');
}

export function TimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

export async function DeleteAlert() {
     const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async function SuccessAlert(msg){
    const result = await Swal.fire({
        text: msg,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async function FailAlert(msg){
    const result = await Swal.fire({
        text: msg,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async function InfoAlert(msg){
    const result = await Swal.fire({
        text: msg,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go Ahead',
        allowOutsideClick: false
    });
    return result.isConfirmed;
}






