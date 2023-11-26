

class DSPEC {

    private metaInfo: object;
    private timeInfo: object;
    private outputInfo: object;
    private inputSpecifications: object[];

    constructor() {
        this.metaInfo = {};
        this.timeInfo = {};
        this.outputInfo = {};
        this.inputSpecifications = [];
    }

    public updateMeta(formData: FormData) {
        const mName = formData.get('mName');
        if(!mName) { console.error('Model name not found in form submission'); }
        const mVersion = formData.get('mVersion');
        if(!mVersion) { console.error('Model version not found in form submission'); }
        const mAuthor = formData.get('mAuthor');
        if(!mAuthor) { console.error('Model author not found in form submission'); }
        const mFileName = formData.get('mFileName');
        if(!mFileName) { console.error('Model file name not found in form submission'); }

        this.metaInfo = {
            modelName: mName,
            modelVersion: mVersion,
            author: mFileName,
            modelFileName: mFileName,
        }
    }


    public updateTime(formData: FormData) {
        const tOffset = formData.get('tOffset');
        if(!tOffset) { console.error('Time offset not found in form submission'); }
        const tInterval = formData.get('tInterval');
        if(!tInterval) { console.error('Time Interval not found in form submission'); }

        this.metaInfo = {
            tOffset: tOffset,
            tInterval: tInterval,
        }
    }
    

    public updateOutput(formData: FormData) {
        const oOutputMethod = formData.get('oOutputMethod');
        if(!oOutputMethod) { console.error('Output method not found in form submission'); }
        const oLeadTime = formData.get('oLeadTime');
        if(!oLeadTime) { console.error('Output lead time not found in form submission'); }
        const oSeries = formData.get('oSeries');
        if(!oSeries) { console.error('Output data series not found in form submission'); }
        const oSelectLocation = formData.get('oSelectLocation');
        if(!oSelectLocation) { console.error('Output data location not found in form submission'); }
        const oInterval = formData.get('oInterval');
        if(!oInterval) { console.error('Output Interval not found in form submission'); }
        const oSelectDatum = formData.get('oSelectDatum');
        if(!oSelectDatum) { console.error('Output data series not found in form submission'); }
        const oSelectUnits = formData.get('oSelectUnits');
        if(!oSelectUnits) { console.error('Output unit interval not found in form submission'); }


        this.metaInfo = {
            outputMethod: oOutputMethod,
            leadTime: oLeadTime,
            series: oOutputMethod,
            location: oSelectLocation,
            interval: oInterval,
            datum: oSelectDatum,
            unit: oSelectUnits,
        }
    }
    public appendInputSpecification(formData: FormData) {

    }
    public updateInputSpecification(index: number, formData: FormData) {

    }
}
