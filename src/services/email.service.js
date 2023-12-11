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
    if (filterBy) {
        const { txt, isRead } = filterBy;
        if (isRead !== null) {
            filteredEmails = filteredEmails.filter(email => email.subject.toLowerCase().includes(txt.toLowerCase()) 
            || email.body.toLowerCase().includes(txt.toLowerCase())
            && email.isRead == isRead); 
        }else{
            filteredEmails = filteredEmails.filter(email =>
                email.subject.toLowerCase().includes(txt.toLowerCase())
                || email.body.toLowerCase().includes(txt.toLowerCase())
            );
        }
           
    }
    return filteredEmails;
}

        // var { status, txt, isRead } = filterBy;
        // filteredEmails = filteredEmails.filter(email => email.status.toLowerCase() == status.toLowerCase()
        //  && email.subject.toLowerCase().includes(txt.toLowerCase()) && email.isRead == isRead);   

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
        // type: '',
        txt: '',
        isRead: null
        // isRead: null

    }
}


function createEmail(subject = '', body = '', isRead = false, isStarred = false, sentAt = '1551133930594', removedAt = null, from = 'momo@momo.com', to = 'user@appsus.com') {
    return {
        id: utilService.makeId(),
        subject: subject,
        body: body,
        isRead: isRead,
        isStarred: isStarred,
        sentAt: sentAt,
        removedAt: removedAt,
        from: from,
        to: to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            {   id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes1',
                isRead: false,
                isStarred: false,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {   id: utilService.makeId(),
                subject: 'vacation in Berlin',
                body: 'Would love to catch up sometimes2',
                isRead: true,
                isStarred: true,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'sapir.teper@gmail.com',
                to: 'user@appsus.com'
            },
            {   id: utilService.makeId(),
                subject: 'trip to Canada',
                body: 'Would love to catch up sometimes3',
                isRead: false,
                isStarred: true,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {   id: utilService.makeId(),
                subject: 'where are you now?',
                body: 'Would love to catch up sometimes4',
                isRead: false,
                isStarred: false,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'roni@gmail.com',
                to: 'user@appsus.com'
            },
            {   id: utilService.makeId(),
                subject: 'hey you',
                body: 'Would love to catch up sometimes5',
                isRead: true,
                isStarred: true,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'adi.Marom@gmail.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}