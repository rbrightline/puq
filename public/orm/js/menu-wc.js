'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">orm</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/DataSourceModule.html" data-type="entity-link" >DataSourceModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AttributeRelation.html" data-type="entity-link" >AttributeRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AttributeRelation-1.html" data-type="entity-link" >AttributeRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ManyRelation.html" data-type="entity-link" >ManyRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ManyRelation-1.html" data-type="entity-link" >ManyRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OneRelation.html" data-type="entity-link" >OneRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OneRelation-1.html" data-type="entity-link" >OneRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OwnerRelation.html" data-type="entity-link" >OwnerRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OwnerRelation-1.html" data-type="entity-link" >OwnerRelation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TestEntity.html" data-type="entity-link" >TestEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TestEntity-1.html" data-type="entity-link" >TestEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntityService.html" data-type="entity-link" >BaseEntityService</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseIdEntity.html" data-type="entity-link" >BaseIdEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseView.html" data-type="entity-link" >BaseView</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonQueryDto.html" data-type="entity-link" >CommonQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountResultDto.html" data-type="entity-link" >CountResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteResultDto.html" data-type="entity-link" >DeleteResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityQueryService.html" data-type="entity-link" >EntityQueryService</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityService.html" data-type="entity-link" >EntityService</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorDto.html" data-type="entity-link" >HttpErrorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IDDto.html" data-type="entity-link" >IDDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SingleValidationErrorDto.html" data-type="entity-link" >SingleValidationErrorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableNamingStrategy.html" data-type="entity-link" >TableNamingStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestObject.html" data-type="entity-link" >TestObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestObject-1.html" data-type="entity-link" >TestObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResultDto.html" data-type="entity-link" >UpdateResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationConstraintsDto.html" data-type="entity-link" >ValidationConstraintsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationErrorDto.html" data-type="entity-link" >ValidationErrorDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});