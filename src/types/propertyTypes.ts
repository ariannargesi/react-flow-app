export enum Type {
    Webservices = 'webservices',
    API = 'api',
    Webapp = 'webapp',
    CLI = 'cli',
    Database = 'database',
    Hardware = 'hardware',
    Firmware = 'Firmware',
    Bios = 'bios',
    Software = 'software',
    MobileApp = 'mobile-app',
    MobileDevice = 'mobile-device',
    IOT = 'iot',
}

export enum AuthenticationType {
    UserID_PWD = 'userid_pwd',
    SSH_Keys = 'ssh_keys',
    Certificates = 'certificates',
}

export enum AuthenticationProtocol {
    SSO = 'sso',
    Federation = 'federation',
    LDAP = 'ldap',
    LDAPS = 'ldaps',
    Ping = 'ping',
}

export enum AuthorizationType {
    RBAC = 'rbac',
    Policy = 'policy',
}

export enum DataSensitivityType {
    Public = 'public',
    Internal = 'internal',
    Restricted = 'restricted',
    Confidential = 'confidential',
}

export enum DataSensitivityProtection {
    Encrypted = 'encrypted',
    UnEncrypted = 'unencrypted',
}

export enum FileUpload {
    Yes = 'yes',
    No = 'no',
}

export enum FileDownload {
    Yes = 'Yes',
    No = 'No',
}

export enum Source {
    OpenSource = 'opensource',
    SupplierDeveloped = 'supplier-develped',
    OEM = 'oem',
    ODM = 'odm',
    supplierManufactured = 'supplier-manufactured',
}

export enum Accessibility {
    Public = 'public',
    Private = 'private',
    Protected = 'protected',
}

export enum Environment {
    OnPremise = 'on premise',
    PublicCloud = 'public cloud',
    PrivateCloud = 'private cloud',
    HybridCloud = 'hybrid cloud',
    ThidPartHost = 'third part host',
}

export enum EdgeProtocol {
    HTTP = 'http',
    HTTPS = 'https',
    TLS_1_1 = 'tls1.1',
    LDAP = 'ldap',
    IDAPS = 'ldaps',
}
