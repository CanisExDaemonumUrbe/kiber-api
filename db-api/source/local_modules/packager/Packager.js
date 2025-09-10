class Packager {

    async packObjectAsync(status, data = null){

        let pack = {
            status: "undefined",
            data: null
        };

        try{

            pack['status'] = status;
            pack['data'] = data;

        } catch (err) {

            pack['status'] = "error";
            pack['data'] = err.message;

        } finally {

            return pack;
        }
    }

    async unpackObjectAsync(pack){

        function convertData(data){

            let result;

            if(data){

                try{

                    if(data.length === `undefined` || data.length == 0 || JSON.stringify(data) == `{}`) {
    
                        result = null;
    
                    } else {
    
                        result = data;
                    }
    
                } catch {
    
                    result = null;
                }

            } else {

                result = data;
            }

            return result;
        }

        let status = null;
        let data = null;

        try{

            if(pack[`status`] == `error`){

                status = pack[`data`];

            } else {

                status = pack[`status`];
                data = convertData(pack[`data`]);
            }

        } catch (err) {

            unpackedObj[0] = `unpack_error`;
            unpackedObj[1] = err.message;

        } finally {

            return [status, data];
        }

    }

}

module.exports = Packager