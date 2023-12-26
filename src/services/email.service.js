import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }
// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
//    }

//    const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     isStarred: false,
//     sentAt : 1551133930594,
//     removedAt : null, //for later use
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
//     }

_createEmails()


async function query(filterBy) {
    const emails = await storageService.query(STORAGE_KEY);
    let filteredEmails = emails;
    const unreadCount = emails.filter(email => (email.to === 'user@appsus.com') && email.isRead === false);

    if (filterBy) {
        const { status, txt, isRead } = filterBy;

        if (isRead != null) {
            filteredEmails = filteredEmails.filter(email => email.isRead === isRead 
                &&( email.subject.toLowerCase().includes(txt.toLowerCase()) 
                || email.body.toLowerCase().includes(txt.toLowerCase())));
        }else{
            filteredEmails = filteredEmails.filter(email =>
                email.subject.toLowerCase().includes(txt.toLowerCase())
                || email.body.toLowerCase().includes(txt.toLowerCase())
            );
        }
           switch (status){
            case 'inbox': 
            filteredEmails = filteredEmails.filter(email => email.to === loggedinUser.email);
            return {emails: filteredEmails, unreadCount: unreadCount.length};
            // return filteredEmails;

            case 'star': 
            filteredEmails = filteredEmails.filter(email => email.isStarred === true);
            return {emails: filteredEmails, unreadCount: unreadCount.length};
            // return filteredEmails;
            
            case 'sent': 
            filteredEmails = filteredEmails.filter(email => email.from === loggedinUser.email);
            return {emails: filteredEmails, unreadCount: unreadCount.length};
            // return filteredEmails;
           }
           
    }
    return {emails: filteredEmails, unreadCount: unreadCount.length};
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.id = utilService.makeId()
        return storageService.post(STORAGE_KEY, emailToSave)
    }
 }

 function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: undefined
    }
}


function createEmail(subject = '', body = '', isRead = undefined, isStarred = false, removedAt = null, from = loggedinUser.email, to = '') {
    return {
        // id: utilService.makeId(),
        subject: subject,
        body: body,
        isRead: isRead,
        isStarred: isStarred,
        sentAt: Date.now(),
        removedAt: removedAt,
        from: from,
        to: to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            {   id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes1',
                isRead: true,
                isStarred: false,
                sentAt : '2021-11-03T00:00:00.000Z',
                removedAt : null,
                from: loggedinUser.email,
                to: 'user@appsus.com'
            },
            {   id: 'e102',
                subject: 'vacation in Berlin',
                body: 'Would love to catch up sometimes2',
                isRead: true,
                isStarred: true,
                sentAt : '2022-05-05T00:00:00.000Z',
                removedAt : null,
                from: 'sapir.teper@gmail.com',
                to: 'user@appsus.com'
            },
            {   id: 'e103',
                subject: 'trip to Canada',
                body: 'Would love to catch up sometimes3',
                isRead: true,
                isStarred: true,
                sentAt : '2023-10-12T00:00:00.000Z',
                removedAt : null,
                from: loggedinUser.email,
                to: 'user@appsus.com'
            },
            {   id: 'e104',
                subject: 'where are you now?',
                body: 'Would love to catch up sometimes4',
                isRead: false,
                isStarred: false,
                sentAt : '2023-10-14T00:00:00.000Z',
                removedAt : null,
                from: 'roni@gmail.com',
                to: 'user@appsus.com'
            },
            {   id: 'e105',
                subject: 'hey you',
                body: 'Would love to catch up sometimes5',
                isRead: true,
                isStarred: true,
                sentAt : '2023-12-24T00:00:00.000Z',
                removedAt : null,
                from: loggedinUser.email,
                to: 'user@appsus.com'
            },
            {   id: 'e106',
                subject: 'hey you2',
                body: 'Would love to catch up sometimes5',
                isRead: true,
                isStarred: true,
                sentAt : '2023-10-17T00:00:00.000Z',
                removedAt : null,
                from: loggedinUser.email,
                to: 'sapir@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}