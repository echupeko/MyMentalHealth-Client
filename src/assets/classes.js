export class TrackerClass {

    constructor(dateSend, userId, dataTrackers) {
        this.dateSend = dateSend;
        this.userId = userId;
        this.dataTrackers = dataTrackers;
    }

    set upload(trackerObject) {
        this._dateSend = trackerObject.dateSend;
        this._userId = trackerObject.userId;
        this._dataTrackers = trackerObject.dataTrackers;
    }

}

export class DataTrackerClass {

    constructor(id, value, name, title, chartTitle, countPoint) {
        this.id = id;
        this.value = value;
        this.name = name;
        this.title = title;
        this.chartTitle = chartTitle;
        this.countPoint = countPoint;
    }

}
