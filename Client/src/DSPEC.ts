import { ServerComms } from './ServerComms';

class DSPEC {

    private metaInfo: object; 
    private timeInfo: object;
    private outputInfo: object;
    private inputSpecifications: object[];
    private markers: object[];

    constructor() {
        this.metaInfo = {};
        this.timeInfo = {};
        this.outputInfo = {};
        this.inputSpecifications = [];
        this.markers = [];
    }

    public saveDspec() {
        
        const dspecData: any = {... this.metaInfo}; // any to make dspecData a loose object
        dspecData.timingInfo = this.timeInfo;
        dspecData.outputInfo = this.outputInfo;
        dspecData.inputs = this.inputSpecifications;
        dspecData.markers = this.markers;

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
            author: mAuthor,
            modelFileName: mFileName,
        }
    }


    public updateTime(formData: FormData) {
        const tOffset = formData.get('tOffset') as string;
        if(!tOffset) { console.error('Time offset not found in form submission'); }
        const tInterval = formData.get('tInterval') as string;
        if(!tInterval) { console.error('Time Interval not found in form submission'); }

        this.timeInfo = {
            tOffset: this.timeStringToSeconds(tOffset),
            tInterval: this.timeStringToSeconds(tInterval),
        }
    }
    

    public updateOutput(formData: FormData, markers: any[]) {

        // Iterate over each marker
        markers.forEach(marker => {
            // If a marker matches a field set it and append it to the dspec
            if(formData.has(marker.field)){
                formData.set(marker.field, marker.data.get('markerID'))
                this.appendMarker(marker.data as FormData, marker.field);
            }
        });

        // Read out all the felids
        const oOutputMethod = formData.get('oOutputMethod');
        if(!oOutputMethod) { console.error('Output method not found in form submission'); }
        const oLeadTime = formData.get('oLeadTime') as string;
        if(!oLeadTime) { console.error('Output lead time not found in form submission'); }
        const oSeries = formData.get('oSeries');
        if(!oSeries) { console.error('Output data series not found in form submission'); }
        const oSelectLocation = formData.get('oSelectLocation');
        if(!oSelectLocation) { console.error('Output data location not found in form submission'); }
        const oInterval = formData.get('oInterval') as string;
        if(!oInterval) { console.error('Output Interval not found in form submission'); }
        const oSelectDatum = formData.get('oSelectDatum');
        if(!oSelectDatum) { console.warn('Output data datum not found in form submission'); }
        const oSelectUnits = formData.get('oSelectUnits');
        if(!oSelectUnits) { console.error('Output unit interval not found in form submission'); }

        // Set the DSPEC component
        this.outputInfo = {
            outputMethod: oOutputMethod,
            leadTime: this.timeStringToSeconds(oLeadTime),
            series: oSeries,
            location: oSelectLocation,
            interval: this.timeStringToSeconds(oInterval),
            datum: oSelectDatum,
            unit: oSelectUnits,
        }
    }
    public appendInputSpecification(formData: FormData, markers: object[]) {
        const inputSpecification = this.parseInputSpecificationFrom(formData, markers);
        this.inputSpecifications.push(inputSpecification);
    }

    public updateInputSpecification(index: number, formData: FormData, markers: object[]) {

        if(index < 0 || index >= this.inputSpecifications.length) { throw RangeError(`Form entry ${formData} caused out of range error in updateInputSpecification`); }
        else {
            this.inputSpecifications[index] = this.parseInputSpecificationFrom(formData, markers);
        }
    }

    public removeInputSpecification(index: number) {

        if(index < 0 || index >= this.inputSpecifications.length) { throw RangeError(`Index:${index} caused out of range error in removeInputSpecification`); }
        else {
            this.inputSpecifications = this.inputSpecifications.slice(0, index).concat(this.inputSpecifications.slice(index + 1));
        }
    }

    public getInputSpecificationLength() { return this.inputSpecifications.length; }

    private parseInputSpecificationFrom(formData: FormData, markers: any[]): object {


        // Iterate over each marker
        markers.forEach(marker => {
            // If a marker matches a field set it and append it to the dspec
            if(formData.has(marker.field)){
                formData.set(marker.field, marker.data.get('markerID'))
                this.appendMarker(marker.data as FormData, marker.field);
            }
        });
        
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
        const iInterval = formData.get('iInterval') as string;
        if(!iInterval) { console.error('Input interval series not found in form submission'); }


        return {
            _name: iName,
            location: iSelectLocation,
            source: iSelectSource,
            series: iSelectSeries,
            unit: iSelectUnits,
            type: iType,
            iInterval: this.timeStringToSeconds(iInterval),
        }
    }

    private appendMarker(data: FormData, field: string) {
        this.markers.push({
            _id: data.get('markerID'),
            _name: data.get('markerName'),
            _desc:  data.get('markerDesc'),
            _field: field
        });
    }

    public parseDspecString(jsonStr: string) {
        const json = JSON.parse(jsonStr);
        
        const errs: string[] = [];
        this.metaInfo = this.parseMetaData(json, errs);
        this.timeInfo = this.parseTimingInfo(json, errs);
        this.outputInfo = this.parseOutputInfo(json, errs);
        this.inputSpecifications = this.parseInputSpecifications(json, errs);
        this.markers = json.markers ? json.markers : [];

        return errs;

    }

    public timeStringToSeconds(timeString: string): number {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
    
        // Check if the string has valid components
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            throw new Error('Invalid time string format');
        }
    
        // Calculate total seconds
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
        return totalSeconds;
    }

    // Private methods
    private parseMetaData(json: any, errCollection: string[]) {
        const metaTemplate = {
            modelName: null,
            modelVersion: null,
            author: null,
            modelFileName: null
        }
        if(json.modelName) {
            metaTemplate.modelName = json.modelName;
        } else { errCollection.push(this.generateErrorMessage('MetaData', 'modelName')); }
        if(json.modelVersion) {
            metaTemplate.modelVersion = json.modelVersion;
        } else { errCollection.push(this.generateErrorMessage('MetaData', 'modelVersion')); }
        if(json.author) {
            metaTemplate.author = json.author;
        } else { errCollection.push(this.generateErrorMessage('MetaData', 'author')); }
        if(json.modelFileName) {
            metaTemplate.modelFileName = json.modelFileName;
        } else { errCollection.push(this.generateErrorMessage('MetaData', 'modelFileName')); }  

        return metaTemplate;
    }

    private parseTimingInfo(json: any, errCollection: string[]) {
        const timingInfoTemplate = {
            tOffset: null,
            tInterval: null,
        }

        if(!json.timingInfo) { errCollection.push(this.generateErrorMessage('TimingInfo', 'ALL Timing Info')); }
        else {
            const TI = json.timingInfo;
            if(TI.tOffset) {
                timingInfoTemplate.tOffset = TI.tOffset;
            } else { errCollection.push(this.generateErrorMessage('TimingInfo', 'tOffset')); }
            if(TI.tInterval) {
                timingInfoTemplate.tInterval = TI.tInterval;
            } else { errCollection.push(this.generateErrorMessage('TimingInfo', 'tInterval')); } 
        }

        return timingInfoTemplate;
    }


    private parseOutputInfo(json: any, errCollection: string[]) {
        const outputInfoTemplate = {
            outputMethod: null,
            leadTime: null,
            series: null,
            location: null,
            interval: null,
            datum: null,
            unit: null,
        }

        if(!json.outputInfo) { errCollection.push(this.generateErrorMessage('OutputInfo', 'ALL Output Info')); }
        else{
            const OI = json.outputInfo;
            if(OI.outputMethod) {
                outputInfoTemplate.outputMethod = OI.outputMethod;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'outputMethod')); }
            if(OI.leadTime) {
                outputInfoTemplate.leadTime = OI.leadTime;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'leadTime')); }
            if(OI.series) {
                outputInfoTemplate.series = OI.series;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'series')); }
            if(OI.location) {
                outputInfoTemplate.location = OI.location;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'location')); }
            if(OI.interval) {
                outputInfoTemplate.interval = OI.interval;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'interval')); }
            if(OI.datum) {
                outputInfoTemplate.datum = OI.datum;
            } // optional
            if(OI.unit) {
                outputInfoTemplate.unit = OI.unit;
            } else { errCollection.push(this.generateErrorMessage('OutputInfo', 'unit')); }
        }

        return outputInfoTemplate;
    }


    private parseInputSpecifications(json: any, errCollection: string[]) {
        const inputSpecifications: object[] = [];

        if(!json.inputs) { errCollection.push(this.generateErrorMessage('Input Specification', 'No InputSpecification')); }
        else {
            let index = 0;
            json.inputs.forEach((specification: object) => {
                inputSpecifications.push(this.parseInputSpecification(index++, specification, errCollection));
            });
        }
        return inputSpecifications;
    }

    private parseInputSpecification(index: number, specification: any, errCollection: string[]): object {
        const inputSpecificationTemplate = {
            _name: null,
            location: null,
            source: null,
            series: null,
            unit: null,
            type: null,
            iInterval: null,
        }

        if(specification._name) {
            inputSpecificationTemplate._name = specification._name;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', '_name')); }
        if(specification.location) {
            inputSpecificationTemplate.location = specification.location;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'location')); }
        if(specification.source) {
            inputSpecificationTemplate.source = specification.source;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'source')); }
        if(specification.series) {
            inputSpecificationTemplate.series = specification.series;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'series')); }
        if(specification.unit) {
            inputSpecificationTemplate.unit = specification.unit;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'unit')); }
        if(specification.type) {
            inputSpecificationTemplate.type = specification.type;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'type')); }
        if(specification.iInterval) {
            inputSpecificationTemplate.iInterval = specification.iInterval;
        } else { errCollection.push(this.generateInputSpecificationErrorMessage(index, 'Input Specification', 'iInterval')); }

        return inputSpecificationTemplate;
    }

    private generateErrorMessage(group: string, label: string): string {
        return `ERROR in ${group}, ${label} is missing;`;
    }

    private generateInputSpecificationErrorMessage(index: number, group: string, label: string): string {
        return `ERROR in ${group} #${index}, ${label} is missing;`;
    }

    public getMarkersLength() { return this.markers.length; }

    public async tryResolveMarkers() {
        
        
        let sc = new ServerComms('http://localhost:8000');
        let source = await sc.requestVariable('source');
        let series = await sc.requestVariable('series');
        let location = await sc.requestVariable('location');
        let units = await sc.requestVariable('units');
        let datum = await sc.requestVariable('datum');
        const allRows = source.concat(series.concat(location.concat(units.concat(datum))));


        let newMarkers: object[] = [];
        // Iterate over each marker
        this.markers.forEach(marker => {
            // If a marker matches a field set it and append it to the dspec
            marker['_id' as keyof typeof marker] in source

            allRows.forEach((row: object) => {
                if(!marker['_id' as keyof typeof marker] == row['code' as keyof typeof row]) {
                    newMarkers.push(marker);
                } 
            });
        });

        this.markers = newMarkers;
    }
}
export { DSPEC }