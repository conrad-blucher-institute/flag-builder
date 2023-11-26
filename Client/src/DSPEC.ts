

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

    public saveDspec() {
        
        const dspecData: any = {... this.metaInfo}; // any to make dspecData a loose object
        dspecData.timingInfo = this.timeInfo;
        dspecData.outputInfo = this.outputInfo;
        dspecData.inputs = this.inputSpecifications;

        const fileAnchor = document.createElement('a') as HTMLAnchorElement;
        var file = new Blob([JSON.stringify(dspecData)], {type: 'text/plain'})
        fileAnchor.href = URL.createObjectURL(file);
        fileAnchor.download = 'DSPEC.json';
        fileAnchor.click();
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

        this.timeInfo = {
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


        this.outputInfo = {
            outputMethod: oOutputMethod,
            leadTime: oLeadTime,
            series: oSeries,
            location: oSelectLocation,
            interval: oInterval,
            datum: oSelectDatum,
            unit: oSelectUnits,
        }
    }
    public appendInputSpecification(formData: FormData) {
        const inputSpecification = this.parseInputSpecificationFrom(formData);
        this.inputSpecifications.push(inputSpecification);
    }

    public updateInputSpecification(index: number, formData: FormData) {

        if(index < 0 || index >= this.inputSpecifications.length) { throw RangeError(`Form entry ${formData} caused out of range error in updateInputSpecification`); }
        else {
            this.inputSpecifications[index] = this.parseInputSpecificationFrom(formData);
        }
    }

    private parseInputSpecificationFrom(formData: FormData): object {
        const iName = formData.get('iName');
        if(!iName) { console.error('Input name not found in form submission'); }
        const iSelectLocation = formData.get('iSelectLocation');
        if(!iSelectLocation) { console.error('Input location time not found in form submission'); }
        const iSelectSource = formData.get('iSelectSource');
        if(!iSelectSource) { console.error('Input data source not found in form submission'); }
        const iSelectSeries = formData.get('iSelectSeries');
        if(!iSelectSeries) { console.error('Input data series not found in form submission'); }
        const iSelectUnits = formData.get('iSelectUnits');
        if(!iSelectUnits) { console.error('Input units not found in form submission'); }
        const iType = formData.get('iType');
        if(!iType) { console.error('Input type not found in form submission'); }
        const iInterval = formData.get('iInterval');
        if(!iInterval) { console.error('Input interval series not found in form submission'); }


        return {
            _name: iName,
            location: iSelectLocation,
            source: iSelectSource,
            series: iSelectSeries,
            unit: iSelectUnits,
            type: iType,
            iInterval: iInterval,
        }
    }
}
export { DSPEC }