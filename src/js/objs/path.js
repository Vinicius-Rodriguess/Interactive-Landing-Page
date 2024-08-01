export const path = {
    all: ["appetizers1", "mainCourses1", "sideDishes1", "soupsBroths1", "snacks1", "sweetsDesserts1", "beverages1"],
    appetizersStarters: ["appetizers1", "appetizers1", "appetizers1"],
    mainCourses: ["mainCourses1", "mainCourses1", "mainCourses1"],
    sideDishes: ["sideDishes1", "sideDishes1", "sideDishes1"],
    soupsBroths: ["soupsBroths1", "soupsBroths1", "soupsBroths1"],
    snacks: ["snacks1", "snacks1", "snacks1"],
    sweetsDesserts: ["sweetsDesserts1", "sweetsDesserts1", "sweetsDesserts1"],
    beverages: ["beverages1", "beverages1", "beverages1"],
    otherResources: ["other1", "other2", "other3", "other4", "other5", "other6", "other7"],
}

const concatOtherResources = () => {
    for (let key in path) {
        if (key == "otherResources") return
        path[key].push(...path.otherResources)
    }  
}
concatOtherResources()