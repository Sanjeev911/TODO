export const getCurrentUserEmail = () => {
    const currentUserEmail = JSON.parse( localStorage.getItem('currentLoggedInUserEmail'));
    return currentUserEmail
}

export const getCurrentUserTasks = () => {
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
        const allTasks = JSON.parse(localStorage.getItem("tasks")) ?? {};
        const userTasks = allTasks[currentUserEmail] ?? [];
        return userTasks
    }
    else {
        return []
    }
}

export const updateUserTaskCounter = () => {
    const currentUserEmail = getCurrentUserEmail();
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user =  allUsers.find((user) => {
        return user.email == currentUserEmail
    })

    user.taskCounter += 1
    localStorage.setItem("users", JSON.stringify(allUsers))
}

