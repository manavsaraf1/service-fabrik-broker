'use strict';

const CONST = require('../../common/constants');
const path = require('path');

class MeteringArchiveStore {
  constructor(cloudProvider) {
    this.cloudProvider = cloudProvider;
  }

  getMeteringArchiveFileName(timeStamp) {
    return path.posix.join(CONST.METERING_ARCHIVE_ROOT_FOLDER, `${CONST.METERING_ARCHIVE_JOB_FILE_PREFIX}${timeStamp}`);
  }

  async putArchiveFile(timeStamp) {
    const fileName = this.getMeteringArchiveFileName(timeStamp);
    await this.cloudProvider.uploadJson(fileName, { 'meteredEvents':[] });
    logger.info(`Created Metering Archive file: ${fileName}`);
  }

  async patchEventToArchiveFile(event, timeStamp) {
    const fileName = this.getMeteringArchiveFileName(timeStamp);
    logger.info(`Patching metered event ${event.metadata.name} to archive ${fileName}`);
    let data = await this.cloudProvider.downloadJson(filename);
    data.meteredEvents.push(event);
    await this.cloudProvider.uploadJson(fileName, data);
  }
}

module.exports = MeteringArchiveStore;
